import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // 1. LOGIN INFO
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

  // 2. PROFILE INFO
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  university: String,
  course: String,
  year: Number,
  phone: String,
  city: String,
  state: String,
  profilePic: String, // URL or base64 string

  // 3. LIFESTYLE / BEHAVIOR
  sleepTime: String, // e.g. "22:00"
  wakeTime: String, // e.g. "07:00"
  smoking: {
    type: Boolean,
    default: false,
  },
  drinking: {
    type: Boolean,
    default: false,
  },
  cleanlinessLevel: {
    type: String,
    enum: ["Messy", "Average", "Very Clean"],
  },
  foodPreference: {
    type: String,
    enum: ["Veg", "Non-Veg", "Vegan", "Eggetarian"],
  },
  introvertOrExtrovert: {
    type: String,
    enum: ["Introvert", "Extrovert", "Ambivert"],
  },

  // 4. PREFERENCES
  personality: [String], // Optional if you want to track personality traits
  hobbies: [String],
  preferredLanguages: [String],

  // 5. EXPECTATIONS
  roommateExpectations: {
    type: String,
  },
  guestsAllowed: {
    type: String, // or Boolean if only "Yes"/"No"
    enum: ["Yes", "No"],
  },

  // 6. Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
