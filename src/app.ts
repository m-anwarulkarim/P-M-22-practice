import express, { Application, Request, Response } from "express";
import { postRouter } from "./post/post.routes";

const app: Application = express();
app.use(express.json());

app.use("/post", postRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello",
  });
});

export default app;
