import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ========== SIGNUP CONTROLLER ========== */

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, contact, gender, age } = req.body;

    if (!name || !email || !password || !contact || !gender || !age) {
      return res.status(400).json({
        message:
          "All required fields (name, email, password, contact, gender, age) must be filled",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "Already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const saved = await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: saved, // ✅ now sending `user` not `student`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Signup Error:", error); // 👈 add this
  }
};

/* ========== LOGIN CONTROLLER ========== */

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

    // ✅ Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // or 'None' with secure:true in production
      secure: false, // true if using https
    });

    res.status(200).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ========== LOGOUT CONTROLLER ========== */

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

/* ==========  UPDATE PROFILE CONTROLLER ========== */

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const updated = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // 👈 updated document वापस दे
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/* ==========  All USER PROFILE CONTROLLER ========== */
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const users = await User.find({ _id: { $ne: currentUserId } })
      .select(
        "name age gender city state university course year profilePic phone sleepTime wakeTime cleanlinessLevel foodPreference smoking drinking introvertOrExtrovert roommateExpectations hobbies preferredLanguages"
      )
      .lean();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
