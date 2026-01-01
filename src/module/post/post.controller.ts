import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({
        success: false,
        message: "Title & Content are required",
      });
    }
    const result = await postService.createPost(req.body, req.user?.id);

    res.status(201).json({
      success: true,
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
