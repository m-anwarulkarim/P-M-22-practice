import { createClient } from "redis";
import { configs } from "../config";

const redisClient = createClient({
  url: configs.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) return new Error("Redis connection failed permanently");
      return 5000; // প্রতি ৫ সেকেন্ড পর পর চেষ্টা করবে
    },
  },
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    throw error;
  }
};

export default redisClient;
