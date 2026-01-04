import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

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
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // true or false
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;
    const page = Number(req.query.page) as number | 1;
    const limit = Number(req.query.limit) as number | 5;

    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.getSinglePost();

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
