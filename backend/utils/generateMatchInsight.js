import openai from "../utils/openai.js"; // Your Groq config

export const generateMatchInsight = async (currentUser, postCreator) => {
  const currentUserName = currentUser.name || "You";
  const creatorName = postCreator.name || "They";

  const prompt = `
Compare the lifestyles of ${currentUserName} and ${creatorName} for a roommate match.
Use very simple, "everyday English" (like how friends talk). 

${currentUserName}'s Lifestyle:
- Smoking: ${currentUser.smoking}, Drinking: ${currentUser.drinking}, Sleep: ${currentUser.sleepTime}, Food: ${currentUser.foodPreference}

${creatorName}'s Lifestyle:
- Smoking: ${postCreator.smoking}, Drinking: ${postCreator.drinking}, Sleep: ${postCreator.sleepTime}, Food: ${postCreator.foodPreference}

Instructions:
1. Break the insight into 2-3 very short bullet points.
2. Use friendly words like "vibe", "sorted", "no clash", "match".
3. Point 1: Mention common habits (like both don't smoke or both sleep late).
4. Point 2: Mention food or chill vibes.
5. Final line: A simple closing like "You guys are a great fit!"

Return JSON format: { "reason": "Point 1. Point 2. Point 3." }
`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a friendly roommate expert. You explain things in very simple, literal English that is easy for everyone to understand. No hard words.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    return {
      reason: `You and ${creatorName} have a similar daily routine. Both of you value personal space and habits, making it a very chill match!`,
    };
  }
};
