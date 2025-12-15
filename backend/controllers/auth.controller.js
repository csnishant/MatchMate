import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ===== SIGNUP ===== */
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, contact, gender, age } = req.body;

    if (!name || !email || !password || !contact || !gender || !age) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===== LOGIN ===== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== LOGOUT ===== */
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
