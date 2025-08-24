const Pizza = require("../models/pizza.model");
const axios = require('axios');
const {redisClient} = require('../config/redis');
const logger = require("../utils/logger");

exports.getrandom = async(req, res) => {
  try{
    const value = await redisClient.get("airandom");
    if(value)
    {
      logger.info("ai random cache hit");
      return res.json(JSON.parse(value));
    }
    else{
      const response = await axios.get(`${process.env.AI_URL}/random-recommend?count=10`);
      const pizzas = await Pizza.find({ _id: { $in: response.data.random_pizzas} }).populate('Ings');

      await redisClient.set("airandom",JSON.stringify(pizzas),{
        EX:300//expire every 5 min
      });
      logger.info("ai random cache miss");

      return res.json(pizzas);
    }
    
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error getting random recomndation pizza:', error);
    logger.error(`Error getting random recomndation pizza: ${error}`);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};