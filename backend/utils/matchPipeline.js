import Post from "../models/post.js";

/**
 * @param {Object} currentUser - Req.user ki details
 * @param {String} searchCity - Frontend se aayi city
 * @param {Number} limit - Kitne results chahiye (Default 20)
 */

export const getMatchAggregation = async (currentUser, searchCity) => {
  return await Post.aggregate([
    {
      $match: {
        city: { $regex: new RegExp(`^${searchCity}$`, "i") },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "creatorDetails",
      },
    },
    {
      $unwind: {
        path: "$creatorDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
};
