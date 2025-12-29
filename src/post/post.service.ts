import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const createPost = async (payload: any) => {
  // Business logic for creating a post would go here
  //   console.log(payload);
  const newPost = await prisma.post.create({
    data: {
      title: payload.title,
      content: payload.content,
      tags: payload.tags,
      authorId: payload.authorId,
      comments: payload.comments,
    },
  });
  console.log(newPost);
  return newPost;
};

export const postService = { createPost };
