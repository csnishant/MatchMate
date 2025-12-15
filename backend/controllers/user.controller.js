import User from "../models/user.js";

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

export const viewUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // user id jo tum fetch karna chahte ho

    const user = await User.findById(id).select(
      "name age gender city state university course year profilePic phone sleepTime wakeTime cleanlinessLevel foodPreference smoking drinking introvertOrExtrovert roommateExpectations hobbies preferredLanguages"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
