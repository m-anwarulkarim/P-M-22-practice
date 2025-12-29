import express, { Application, Request, Response } from "express";
import { postRouter } from "./post/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { configs } from "./config";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: configs.APP_URL,
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/post", postRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

export default app;
