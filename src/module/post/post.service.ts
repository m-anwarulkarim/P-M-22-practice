import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const createPost = async (payload: any, userId: string) => {
  if (!payload) {
    return "No Data Found";
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        tags: payload.tags,
        authorId: payload.authorId,
      },
    });

    // console.log(newPost);
    return newPost;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const postService = { createPost };
