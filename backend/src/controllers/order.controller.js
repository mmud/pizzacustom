const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model");
const CartItem = require("../models/cartItem.model");
const Order = require("../models/order.model");

exports.checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "Cart",
      populate: {
        path: "Pizza",
        populate: {
          path: "Ings",
        },
      },
    });

    const cartItems = user.Cart;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "The cart is empty." });
    }

    const lineItems = [];
    let total=0;

    cartItems.forEach((elm) => {
      let pizzaPrice = 10;
      elm.Pizza.Ings.forEach((ing) => {
        pizzaPrice += Number(ing.Price);
      });

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: elm.Pizza.name || "Custom Pizza",
            description: `Includes ${elm.Pizza.Ings.map((ing) => ing.name).join(", ")}`,
          },
          unit_amount: Math.round(pizzaPrice * 100),
        },
        quantity: elm.Count,
      });
      total+=pizzaPrice*elm.Count;
    });

    const order = await Order.create({
      UserId: user._id,
      Pizzas:cartItems,
      TotalPrice:total,
      PaymentStatus: 'pending',
      PaymentIntentId: null,
      Status:"In Making"
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: user.email,
      success_url: `${process.env.FRONTURL}/success?id=${order._id}`,
      cancel_url: `${process.env.FRONTURL}/cancel`,
    });

    await Order.findByIdAndUpdate(order._id,{PaymentIntentId:session.id});

    
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

exports.success = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, msg: "order ID is required." });
    }
    const myorder=await Order.findById(orderId);
    if(!myorder)
      return res.status(400).json({msg:"order not found"});
    const session = await stripe.checkout.sessions.retrieve(String(myorder.PaymentIntentId));

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ success: false, msg: "Payment not verified or incomplete." });
    }

    myorder.PaymentStatus = "paid";
    await myorder.save();

    await User.findByIdAndUpdate(req.user._id, { Cart: [] }, { new: true });
    
    return res.status(200).json({
      success: true,
      msg: "Payment verified, order status updated, and cart cleared.",
      myorder,
    });
  } catch (error) {
    console.error("Error handling success endpoint:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};


exports.getmyorders = async (req, res) => {
  try {
    let num = req.query.num;
    const orders=await Order.find({UserId:req.user.id}).skip((num-1)*10).limit(10).populate({
      path: "Pizzas",
      populate: {
        path: "Pizza",
        populate: {
          path: "Ings",
        },
      },
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error handling myorders endpoint:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};


exports.getallorders = async (req, res) => {
  try {
    let num = req.query.num;
    const orders=await Order.find().skip((num-1)*10).limit(10).populate({
      path: "Pizzas",
      populate: {
        path: "Pizza",
        populate: {
          path: "Ings",
        },
      },
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error handling allorders endpoint:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { orderId,status } = req.body;
    if (!orderId||!status) {
      return res.status(400).json({ success: false, msg: "order ID is required." });
    }
    await Order.findByIdAndUpdate(orderId,{Status:status});
   
    return res.status(200).json("done");
  } catch (error) {
    console.error("Error handling success endpoint:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};