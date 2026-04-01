import openai from "../utils/openai.js";
import User from "../models/user.js";


export const aiSmartFilter = async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Convert roommate search text into MongoDB JSON filter.

Fields:
city, university, smoking, drinking, cleanlinessLevel, foodPreference, introvertOrExtrovert

Rules:
- Return ONLY JSON
- smoking/drinking → true/false
- cleanlinessLevel → "Messy", "Average", "Very Clean"
- introvertOrExtrovert → "Introvert", "Extrovert", "Ambivert"
- Ignore unknown fields
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let filters;
    try {
      filters = JSON.parse(aiResponse.choices[0].message.content);
    } catch {
      return res.status(400).json({ message: "Invalid AI response" });
    }

    const users = await User.find(filters);

    res.json({ filters, users });
  } catch (err) {
    res.status(500).json({ message: "AI filter failed" });
  }
};
