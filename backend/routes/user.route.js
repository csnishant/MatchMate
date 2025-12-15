import express from "express";
import {
  getAllUsers,
  updateUserProfile,
  viewUserProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.put("/profile/:id", isAuthenticated, updateUserProfile);
router.get("/all-users", isAuthenticated, getAllUsers);
router.get("/user-profile/:id", isAuthenticated, viewUserProfile);

export default router;
