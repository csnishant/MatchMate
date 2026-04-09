import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// Ye log terminal mein check karein
console.log("LOG: API Key loaded ->", process.env.GROQ_API_KEY ? "YES" : "NO");
console.log("LOG: Starts with ->", process.env.GROQ_API_KEY?.substring(0, 4));

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default openai;
