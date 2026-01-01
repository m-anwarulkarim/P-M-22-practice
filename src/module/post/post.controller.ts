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

    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await postService.createPost(req.body, req.user?.id!);

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

const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.getAllPost(req.query.search as any);
    console.log(result);

    res.status(201).json({
      success: true,
      message: "Post Retrived successfully",
      post: result,
    });
  } catch (e) {
    res.status(400).json({
      error: "Post Retrived failed",
      details: e,
    });
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const { search } = req.query as unknown as { search: string };

    const result = await postService.getAllPost({ search });

    res.status(201).json({
      success: true,
      message: "Post Retrived successfully",
      post: result,
    });
  } catch (e) {
    res.status(400).json({
      error: "Post Retrived failed",
      details: e,
    });
  }
};
export const postController = { createPost, getAllPost, getSinglePost };
