const mongoose = require('mongoose');
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("✅ MongoDB Connected");
    logger.info("✅ MongoDB Connected");
  } catch (err) {
    console.error(`❌ Database Connection Failed: ${err}`);
    logger.error(`❌ Database Connection Failed: ${err}`);
    
  }
};
module.exports = connectDB;