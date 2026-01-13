import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  // 🔗 Linked to User who created the post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 📍 Location Details
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },

  // 👥 Looking for
  lookingForGender: {
    type: String,
    enum: ["Male", "Female", "Any"],
    default: "Any",
  },

  // 📅 Time Duration
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },

  // ⏳ Minimum Stay (in months)
  minStayDuration: {
    type: Number, // e.g., 2 (means 2 months)
    required: true,
  },

  // 💸 Budget Details
  budgetPerPerson: {
    type: Number,
    required: true,
  },

  // 🏠 Room Details (if user already has a room)
  hasRoom: {
    type: Boolean,
    default: false,
  },
  roomImages: [
    {
      type: String, // Cloud image URL
    },
  ],
  totalRoomRent: {
    type: Number, // Full rent of the room/flat
  },
  rentPerRoommate: {
    type: Number, // How much each roommate will pay
  },
  roomDescription: {
    type: String,
  },

  // 👥 Multi-User Group Support
  groupMembers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // 📝 Additional Notes
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  // 🕒 Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
