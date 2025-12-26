import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.userId; // Token se nikal ke middleware bhej raha hai

    const {
      city,
      area,
      lookingForGender,
      fromDate,
      toDate,
      minStayDuration,
      budgetPerPerson,
      hasRoom,
      roomImages,
      totalRoomRent,
      rentPerRoommate,
      roomDescription,
      description,
    } = req.body;

    // 🛑 Basic Validation  dsfd
    if (
      !city ||
      !area ||
      !fromDate ||
      !toDate ||
      !minStayDuration ||
      !budgetPerPerson
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newPost = new Post({
      user: userId,
      city,
      area,
      lookingForGender,
      fromDate,
      toDate,
      minStayDuration,
      budgetPerPerson,
      hasRoom,
      roomImages,
      totalRoomRent,
      rentPerRoommate,
      roomDescription,
      description,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Roommate post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name gender age university course profilePic hasRoom") // ✅ user ka basic info bhejega
      .sort({ createdAt: -1 }); // Latest post upar

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
