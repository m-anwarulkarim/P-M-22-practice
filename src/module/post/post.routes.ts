import express from "express";
import { postController } from "./post.controller";
import authGurd from "../../middleware/authGurd";
import { ROLE } from "../../types/role.type";

const router = express.Router();

router.post("/", authGurd(ROLE.ADMIN, ROLE.USER), postController.createPost);
router.get("/", authGurd(ROLE.ADMIN, ROLE.USER), postController.getAllPost);
router.get("/", authGurd(ROLE.ADMIN, ROLE.USER), postController.getSinglePost);

export const postRouter = router;
