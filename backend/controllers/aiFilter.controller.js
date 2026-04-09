import openai from "../utils/openai.js";
import User from "../models/user.js";

export const aiSmartFilter = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Yeh Groq ka free model hai
      messages: [
        {
          role: "system",
          content: `
            Convert roommate search text into MongoDB JSON filter.
            Fields: city, university, smoking, drinking, cleanlinessLevel, foodPreference, introvertOrExtrovert
            Rules:
            - Return ONLY raw JSON
            - smoking/drinking → boolean (true/false)
            - cleanlinessLevel → "Messy", "Average", "Very Clean"
            - introvertOrExtrovert → "Introvert", "Extrovert", "Ambivert"
            - If a field is not mentioned, do NOT include it in JSON.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" }, // Ensure karta hai ki JSON hi aaye
    });

    // AI se aaya hua string content parse karein
    const filterString = aiResponse.choices[0].message.content;
    const filters = JSON.parse(filterString);

    // Database mein search karein
    const users = await User.find(filters);

    res.status(200).json({
      success: true,
      filters,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("AI FILTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "AI processing failed",
      error: err.message,
    });
  }
};
