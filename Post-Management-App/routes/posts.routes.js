import { Router } from "express";
import PostController from "../controllers/posts.controller.js";

const router = Router();

// /posts

router.get("", PostController.getAllPosts); // Get all posts
router.get("/:username", PostController.getUserPosts); // Get all posts by user
router.post("", PostController.createPost); // Create a new post
router.put("/:id", PostController.updatePost); // Update a post
router.patch("/like/:id", PostController.likePost); // Like a post
router.delete("/:id", PostController.deletePost); // Delete post
router.delete("/user/:username", PostController.deleteUserPosts); // Delete all posts of a user

export default router;
