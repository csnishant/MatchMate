import Post from "../models/post.js";

export const getMatchAggregation = async (
  searchCity,
  currentUser,
  startIndex,
  limitNumber,
) => {
  // Safe parsing functions for Time string "HH:MM" inside MongoDB
  const getHourExpr = (field) => ({
    $convert: {
      input: { $arrayElemAt: [{ $split: [field, ":"] }, 0] },
      to: "int",
      onError: 0,
      onNull: 0,
    },
  });

  // Mapping Cleanliness string to numbers
  const getCleanlinessScoreExpr = (field) => ({
    $switch: {
      branches: [
        { case: { $eq: [field, "Messy"] }, then: 1 },
        { case: { $eq: [field, "Average"] }, then: 2 },
        { case: { $eq: [field, "Very Clean"] }, then: 3 },
      ],
      default: 0,
    },
  });

  const currentUserSleep = currentUser.sleepTime
    ? parseInt(currentUser.sleepTime.split(":")[0])
    : 0;
  const currentUserWake = currentUser.wakeTime
    ? parseInt(currentUser.wakeTime.split(":")[0])
    : 0;

  const currentCleanlinessNum =
    currentUser.cleanlinessLevel === "Messy"
      ? 1
      : currentUser.cleanlinessLevel === "Average"
        ? 2
        : currentUser.cleanlinessLevel === "Very Clean"
          ? 3
          : 0;

  return await Post.aggregate([
    // 1. Filter active posts by city (Using index)
    {
      $match: {
        city: { $regex: new RegExp(`^${searchCity}$`, "i") },
        isActive: true,
      },
    },
    // 2. Lookup user profile details
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
    // 3. Dynamic Match Score Calculation
    {
      $addFields: {
        matchScore: {
          $let: {
            vars: {
              // Time diff math
              sleepDiff: {
                $abs: {
                  $subtract: [
                    currentUserSleep,
                    getHourExpr("$creatorDetails.sleepTime"),
                  ],
                },
              },
              wakeDiff: {
                $abs: {
                  $subtract: [
                    currentUserWake,
                    getHourExpr("$creatorDetails.wakeTime"),
                  ],
                },
              },
              // Cleanliness diff math
              cleanlinessDiff: {
                $abs: {
                  $subtract: [
                    currentCleanlinessNum,
                    getCleanlinessScoreExpr("$creatorDetails.cleanlinessLevel"),
                  ],
                },
              },
            },
            in: {
              $min: [
                100,
                {
                  $sum: [
                    // Smoking (20)
                    {
                      $cond: [
                        {
                          $eq: ["$creatorDetails.smoking", currentUser.smoking],
                        },
                        20,
                        0,
                      ],
                    },
                    // Drinking (15)
                    {
                      $cond: [
                        {
                          $eq: [
                            "$creatorDetails.drinking",
                            currentUser.drinking,
                          ],
                        },
                        15,
                        0,
                      ],
                    },
                    // Sleep Time (20)
                    {
                      $switch: {
                        branches: [
                          { case: { $lte: ["$$sleepDiff", 1] }, then: 20 },
                          { case: { $lte: ["$$sleepDiff", 2] }, then: 15 },
                          { case: { $lte: ["$$sleepDiff", 4] }, then: 5 },
                        ],
                        default: 0,
                      },
                    },
                    // Wake Time (10)
                    {
                      $switch: {
                        branches: [
                          { case: { $lte: ["$$wakeDiff", 1] }, then: 10 },
                          { case: { $lte: ["$$wakeDiff", 2] }, then: 7 },
                        ],
                        default: 0,
                      },
                    },
                    // Food Preference (15)
                    {
                      $cond: [
                        {
                          $eq: [
                            "$creatorDetails.foodPreference",
                            currentUser.foodPreference,
                          ],
                        },
                        15,
                        0,
                      ],
                    },
                    // Cleanliness (15)
                    {
                      $switch: {
                        branches: [
                          { case: { $eq: ["$$cleanlinessDiff", 0] }, then: 15 },
                          { case: { $eq: ["$$cleanlinessDiff", 1] }, then: 8 },
                        ],
                        default: 0,
                      },
                    },
                    // Personality (5)
                    {
                      $cond: [
                        {
                          $eq: [
                            "$creatorDetails.personality",
                            currentUser.personality,
                          ],
                        },
                        5,
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    // 4. Handle incomplete profiles
    {
      $addFields: {
        matchScore: {
          $cond: [{ $not: ["$creatorDetails"] }, 0, "$matchScore"],
        },
      },
    },
    // 5. Facet for seamless Pagination & Total Counter in single query
    {
      $facet: {
        metaData: [{ $count: "total" }],
        data: [
          { $sort: { matchScore: -1, createdAt: -1 } },
          { $skip: startIndex },
          { $limit: limitNumber },
        ],
      },
    },
  ]);
};
