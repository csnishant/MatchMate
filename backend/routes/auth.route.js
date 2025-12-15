// routes/auth.route.js
import express from "express";
import {
  logoutUser,
  loginUser,
  signupUser,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/logout", logoutUser);

export default router;
