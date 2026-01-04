import { prisma } from "../../lib/prisma";
import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";

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
const getAllPost = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number | 1;
  limit: number | 5;
}) => {
  const andConditions: PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  if (status) {
    andConditions.push({
      status,
    });
  }

  if (authorId) {
    andConditions.push({
      authorId,
    });
  }

  const allPost = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });
  return allPost;
};

const getSinglePost = async () => {
  try {
    const result = await prisma.post.findMany();

    // console.log(newPost);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Could not create post in database");
  }
};
export const postService = { createPost, getAllPost, getSinglePost };
