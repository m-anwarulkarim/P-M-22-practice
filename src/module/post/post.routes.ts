import express from "express";
import { postController } from "./post.controller";
import authGurd from "../../middleware/authGurd";
import { ROLE } from "../../types/role.type";

const router = express.Router();

router.post("/", authGurd(ROLE.USER), postController.createPost);

export const postRouter = router;
