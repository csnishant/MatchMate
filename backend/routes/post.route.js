import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getSinglePost,
  togglePostStatus,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createPost);
router.get("/all-posts", isAuthenticated, getAllPosts);
router.get("/my-post", isAuthenticated, getMyPosts);
router.put("/toggle/:id", isAuthenticated, togglePostStatus);
router.delete("/delete/:id", isAuthenticated, deletePost);
router.put("/update/:id", isAuthenticated, updatePost);
router.get("/get/:id", isAuthenticated, getSinglePost);

export default router;
