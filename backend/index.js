import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import requestRoute from "./routes/request.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/user-post", postRoute);
app.use("/api/request", requestRoute);
app.use("/api/auth", authRoute); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
