import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await postService.createPost(req.body);
    // console.log(result);
    res.status(201).json({
      message: "Post created successfully",
      post: result,
    });
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

export const postController = { createPost };
