import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  signupUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.put("/profile/:id", isAuthenticated, updateUserProfile);
router.get("/all-users", isAuthenticated, getAllUsers);

export default router;
