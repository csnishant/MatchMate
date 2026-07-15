import Post from "../models/post.js"; // make sure path is correct
import User from "../models/user.js";
import { calculateScore } from "../utils/calculateScore.js";
import { generateMatchInsight } from "../utils/generateMatchInsight.js";
import { getMatchAggregation } from "../utils/matchPipeline.js";

export const createPost = async (req, res) => {
  try {
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

    const savedPost = await newPost.save();

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
    const userId = req.userId;

    const {
      city,
      gender,
      university,
      hasRoom,
      page = 1,
      limit = 4,
    } = req.query;

    console.log(req.query);
    
    const pageNumber = Math.max(1, parseInt(page));

    const limitNumber = Math.max(1, parseInt(limit));

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required for matching",
      });
    }

    // 1. Get current user (Optimized projection)
    const currentUser = await User.findById(userId).select(
      "smoking drinking sleepTime wakeTime foodPreference cleanlinessLevel personality",
    );

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Fetch matched city posts using pure DB optimization
    const startIndex = (pageNumber - 1) * limitNumber;
    const aggregationResult = await getMatchAggregation(
      city,
      currentUser,
      startIndex,
      limitNumber,
      gender,
      university,
      hasRoom,
    );

    // Destructure facet results safely
    const totalPosts = aggregationResult[0]?.metaData[0]?.total || 0;
    const paginatedPosts = aggregationResult[0]?.data || [];

    // 3. AI Insights only for the limited paginated posts
    await Promise.all(
      paginatedPosts.map(async (post) => {
        // Map creatorDetails as user if needed by frontend
        post.user = post.creatorDetails;

        if (!post.creatorDetails) {
          post.matchReason = "Profile incomplete";
          return;
        }

        if (post.matchScore > 0) {
          try {
            const ai = await generateMatchInsight(currentUser, post.user);
            post.matchReason = ai?.reason || "Good Match";
          } catch (aiErr) {
            console.error("AI Insight Error for post:", post._id, aiErr);
            post.matchReason = "Compatible Profile";
          }
        } else {
          post.matchReason = "Low Compatibility";
        }
      }),
    );

    // 4. Final Clean Response
    return res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      totalPosts,
      hasMore: startIndex + limitNumber < totalPosts,
      posts: paginatedPosts,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching matched posts",
    });
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
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
};
