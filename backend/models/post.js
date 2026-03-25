import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  // 🔗 Linked to User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 📍 Location
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },

  // 👥 Gender preference
  lookingForGender: {
    type: String,
    enum: ["male", "female", "any"],
    default: "any",
  },

  // 💸 Budget
  budgetPerPerson: {
    type: Number,
    required: true,
  },

  // 🏠 Room info
  hasRoom: {
    type: Boolean,
    default: false,
  },
  totalRoomRent: {
    type: Number,
  },

  // 📝 Description
  description: {
    type: String,
  },

  // 🔴 Post status
  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
