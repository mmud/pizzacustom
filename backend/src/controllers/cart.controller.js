const { populate } = require("dotenv");
const CartItem = require("../models/cartItem.model");
const Pizza = require("../models/pizza.model");
const User = require("../models/user.model");

// exports.getUsers = async(req, res) => {
//   try{
//   } 
//   catch (error) {
//     // Catch Unexpected Errors
//     console.error('Error creating user:', error);
//     res.status(500).json({
//         success: false,
//         message: 'Internal Server Error.',
//     });
//   }
// };

exports.addtocart = async(req, res) => {
  try{
    const {ings,count}=req.body;
    if(!ings||!count)
      return res.status(404).json({msg:"need data"});
    
      const pizza = await Pizza.create({ Ings: ings, UserId: req.user._id });

      const cartItem = await CartItem.create({ Pizza: pizza._id,Count: count });

      const user = await User.findByIdAndUpdate(
          req.user._id,
          { $push: { Cart: cartItem._id } }, 
          { new: true } 
      );

    return res.status(200).json("done");
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
      const { cartItemId } = req.body;
      if (!cartItemId) 
        return res.status(404).json({msg:"need data"});
      

      const user = await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { Cart: cartItemId } }, 
          { new: true } 
      );

      await CartItem.findByIdAndDelete(cartItemId);

      return res.status(200).json("done");

  } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).json({
          success: false,
          message: 'Internal Server Error.',
      });
  }
};

exports.updateCartItemCount = async (req, res) => {
  try {
      const { cartItemId, count } = req.body;

      if (!cartItemId || !count ) 
        return res.status(404).json({msg:"need data"});


      const cartItem = await CartItem.findByIdAndUpdate(
          cartItemId,
          { Count:count }, 
          { new: true } 
      );

      if (!cartItem)
        return res.status(404).json({msg:"cartItem notFound"});

      return res.status(200).json("done");

  } catch (error) {
      console.error('Error updating cart item count:', error);
      res.status(500).json({
          success: false,
          message: 'Internal Server Error.',
      });
  }
};
exports.getcart = async(req, res) => {
  try{
    const user=await User.findById(req.user._id).populate({
      path: 'Cart',
      populate: {
          path: 'Pizza',
          populate:{
            path:"Ings"
          }
      },
  });
    return res.status(200).json(user.Cart);
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};
