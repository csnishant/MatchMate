import openai from "../utils/openai.js"; // Your Groq config

export const calculateMatchScore = async (currentUser, postCreator) => {
  const prompt = `
    Analyze roommate compatibility based on SIMILARITY.
    
    Current User: Smoking: ${currentUser.smoking}, Drinking: ${currentUser.drinking}, Food: ${currentUser.foodPreference}, Sleep: ${currentUser.sleepTime}
    Post Creator: Smoking: ${postCreator.smoking}, Drinking: ${postCreator.drinking}, Food: ${postCreator.foodPreference}, Sleep: ${postCreator.sleepTime}

    SCORING LOGIC (Start from 0, Max 100):
    1. Smoking/Drinking: 
       - If BOTH are same (Both True OR Both False): Add +30 points.
       - If DIFFERENT (One True, One False): Add 0 points (High friction).
    2. Daily Routine: If sleep/wake times are within 2 hours: Add +20 points.
    3. Food Preference: If same: Add +20 points.
    4. Cleanliness: If same level: Add +15 points.
    5. Social Vibe: If same (Introvert/Extrovert): Add +15 points.

    INSTRUCTIONS:
    - If both users smoke, they are COMPATIBLE. Do not penalize for bad habits if they are shared.
    - The score must be between 0 and 100. Never return negative numbers.
    
    Return ONLY JSON: {"score": number, "reason": "string"}
  `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a neutral matching engine. Compatibility is based on how SIMILAR two people are, not how 'good' their habits are.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);

    // Safety Check: Backend par bhi ensure karein ki score 0-100 ke beech ho
    result.score = Math.max(0, Math.min(100, result.score));

    return result;
  } catch (error) {
    console.error("AI Scoring Error:", error);
    return { score: 50, reason: "Compatibility based on basic profile." };
  }
};
