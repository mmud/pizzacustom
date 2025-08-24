const redis = require("redis");
const redisClient = redis.createClient();
const logger = require("../utils/logger");

const connectRedis = async () => {
  redisClient.on('error',(err)=>{
      console.log("Redis client error: ",err);
      logger.error(`Redis client error: ${err}`);
  })

  redisClient.on('ready',(err)=>{
      console.log("🟥 Redis client started");
      logger.info("🟥 Redis client started");
  })

  await redisClient.connect();

  await redisClient.ping();
};
module.exports = {connectRedis,redisClient};