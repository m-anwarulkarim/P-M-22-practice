import app from "./app";
import { configs } from "./config";
import { prisma } from "./lib/prisma";
// import { connectRedis } from "./lib/redis";

const PORT = configs.PORT || 5000;
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    // ২. Redis ফেল করলে আমরা শুধু এরর দেখাবো, কিন্তু সার্ভার থামাবো না
    // try {
    //   await connectRedis();
    //   console.log("✅ Redis connected");
    // } catch (redisError) {
    //   console.error("⚠️ Redis failed, but server will continue...");
    // }
  } catch (error) {
    console.error("❌ Critical error:", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
