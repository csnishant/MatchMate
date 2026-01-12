import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createPost);
router.get("/all-posts",isAuthenticated, getAllPosts); 

export default router;
