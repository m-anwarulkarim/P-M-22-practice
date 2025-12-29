import config from "dotenv";

config.config();

export const configs = {
  PORT: process.env.port || 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
  APP_URL: process.env.APP_URL || "",
};
