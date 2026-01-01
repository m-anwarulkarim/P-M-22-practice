import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  console.log(data, userId);
  try {
    if (!data) {
      return "No Data Found";
    }
    const newPost = await prisma.post.create({
      data: {
        ...data,
        authorId: userId,
      },
    });

    // console.log(newPost);
    return newPost;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Could not create post in database");
  }
};

const getAllPost = async (paload: { search: string }) => {
  try {
    const result = await prisma.post.findMany({
      where: {
        title: {
          contains: paload.search,
        },
      },
    });

    // console.log(newPost);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Could not create post in database");
  }
};

const getSinglePost = async ({ id }: { id: string }) => {
  try {
    const result = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    // console.log(newPost);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Could not create post in database");
  }
};
export const postService = { createPost, getAllPost, getSinglePost };
