import dotenv from "dotenv";

dotenv.config();

export const configs = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
  APP_URL: process.env.APP_URL || "",

  // GOOGLE_INFO
  APP_USER: process.env.APP_USER || "",
  APP_PASS: process.env.APP_PASS || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",

  // FB_INFO
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "",
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "",
  REDIS_URL: process.env.REDIS_URL || "",

  // ADMIN_INFO
  ADMIN_PASS: process.env.ADMIN_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_NAME: process.env.ADMIN_NAME,
};
