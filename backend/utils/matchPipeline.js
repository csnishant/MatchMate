import Post from "../models/post.js";

/**
 * @param {Object} currentUser - Req.user ki details
 * @param {String} searchCity - Frontend se aayi city
 * @param {Number} limit - Kitne results chahiye (Default 20)
 */
export const getMatchAggregation = async (
  currentUser,
  searchCity,
  limit = 20,
) => {
  return await Post.aggregate([
    // 1. Filter early (FASTEST)
    {
      $match: {
        city: { $regex: new RegExp(searchCity, "i") },
        isActive: true,
        user: { $ne: currentUser._id },
        $or: [
          { lookingForGender: "any" },
          { lookingForGender: currentUser.gender },
        ],
      },
    },

    // 2. Join user
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "creatorDetails",
      },
    },

    // 3. Safe unwind
    {
      $unwind: {
        path: "$creatorDetails",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 4. Limit last (good practice)
    { $limit: limit },
  ]);
};
