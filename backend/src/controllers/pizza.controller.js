const Pizza = require("../models/pizza.model");
const axios = require('axios');

exports.getrandom = async(req, res) => {
  try{
    const response = await axios.get(`${process.env.AI_URL}/random-recommend?count=10`);
    const pizzas = await Pizza.find({ _id: { $in: response.data.random_pizzas} }).populate('Ings');

    return res.json(pizzas);
    
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error getting random recomndation pizza:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};