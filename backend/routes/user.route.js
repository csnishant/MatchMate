import express from "express";
import {
  getAllUsers,
  updateUserProfile,
  viewUserProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile/:id", isAuthenticated, updateUserProfile);
router.get("/all-users", isAuthenticated, getAllUsers);
router.get("/user-profile/:id", isAuthenticated, viewUserProfile);

export default router;
