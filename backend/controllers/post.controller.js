import Post from "../models/Post.js"; // make sure path is correct

export const createPost = async (req, res) => {
  try {
    console.log("Payload:", req.body);
    console.log("UserId:", req.userId);

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const {
      city,
      area,
      budgetPerPerson,
      totalRoomRent,
      hasRoom,
      description,
      lookingForGender,
    } = req.body;

    if (!city || !area || !budgetPerPerson) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check existing post
    const existingPost = await Post.findOne({ user: userId });
    if (existingPost) {
      return res.status(400).json({ message: "Only one post allowed" });
    }

    const newPost = new Post({
      user: userId,
      city,
      area,
      lookingForGender: lookingForGender || "any",
      budgetPerPerson: Number(budgetPerPerson),
      hasRoom: hasRoom || false,
      totalRoomRent: hasRoom ? Number(totalRoomRent) : null,
      description: description || "",
      isActive: true,
    });

    console.log("Saving new post:", newPost);
    const savedPost = await newPost.save();
    console.log("Post saved:", savedPost);

    res.status(201).json({ success: true, post: savedPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const userId = req.userId; // ✅ current logged-in user

    const posts = await Post.find({
      user: { $ne: userId },
      // ❌ apni post exclude
      isActive: true,
    })
      .populate("user", "name gender age university course profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const myPosts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts: myPosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    // Allowed fields update (including isActive)
    const allowedUpdates = [
      "city",
      "area",
      "lookingForGender",
      "fromDate",
      "toDate",
      "minStayDuration",
      "budgetPerPerson",
      "hasRoom",
      "roomImages",
      "totalRoomRent",
      "rentPerRoommate",
      "roomDescription",
      "description",
      "isActive",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) post[field] = req.body[field];
    });

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};
export const togglePostStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.isActive = !post.isActive;
    await post.save();

    res.status(200).json({
      success: true,
      isActive: post.isActive,
      message: `Post ${post.isActive ? "Enabled" : "Disabled"} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle post status" });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found in DB"); // ✅ check if DB returned nothing
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Post found:", post); // ✅ show the post
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error); // ✅ show any DB errors
    res.status(500).json({ message: "Failed to fetch post" });
  }
};
