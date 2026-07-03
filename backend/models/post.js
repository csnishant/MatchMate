import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  // 🔗 Linked to User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  // 📍 Location
  city: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
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
    min: 500,
    max: 100000,
  },

  // 🏠 Room info
  hasRoom: {
    type: Boolean,
    default: false,
  },
  totalRoomRent: {
    type: Number,
    min: 0,
  },

  // 📝 Description
  description: {
    type: String,
    maxlength: 300,
    trim: true,
  },

  // 🔴 Post status
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});
// Compound indexes
PostSchema.index({ city: 1, isActive: 1 });
PostSchema.index({ city: 1, createdAt: -1 });

const Post = mongoose.model("Post", PostSchema);
export default Post;
