import User from "../models/user.js";
import Request from "../models/request.js";

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
    const { id } = req.params;
    const loggedInUserId = req.userId;

    const user = await User.findById(id)
      .select(
        `
        name email age gender phone
        city state university course year profilePic
        sleepTime wakeTime
        smoking drinking
        cleanlinessLevel foodPreference
        introvertOrExtrovert personality
        hobbies preferredLanguages
        roommateExpectations guestsAllowed
        createdAt
      `
      )
      .lean(); // 🔥 important

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Check accepted request (both sides)
    const acceptedRequest = await Request.findOne({
      $or: [
        { sender: loggedInUserId, receiver: id },
        { sender: id, receiver: loggedInUserId },
      ],
      status: "accepted",
    });

    const isRequestAccepted = !!acceptedRequest;

    // ❌ Phone hide if not accepted
    if (!isRequestAccepted) {
      delete user.phone;
    }

    res.status(200).json({
      success: true,
      user: {
        ...user,
        isRequestAccepted,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
