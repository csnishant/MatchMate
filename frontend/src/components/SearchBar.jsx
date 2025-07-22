import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const texts = [
  "Search for MatchMate...",
  "Find your roommate...",
  "Discover your perfect match...",
];

export default function SearchBar() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("all-users"); // 👈 Add this line
  const navigate = useNavigate();

  // 🔥 Typing Animation
  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  // 🔥 Handle Search Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/${category}?search=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 pt-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0f172a]">
        "Find the roommate{" "}
        <span className="text-blue-600">
          <br />
          who fits your vibe,
        </span>
        <span className="text-white">
          <br />
          not just your space.”
        </span>
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 px-6 py-3 
          w-[90%] sm:w-[600px] md:w-[700px] 
          rounded-full bg-[#f1f5f9] 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
          transition-all duration-300 
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
        {/* Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1 rounded-full bg-white border border-gray-300 text-sm">
          <option value="all-users">Users</option>
          <option value="all-posts">Posts</option>
        </select>

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={displayedText}
          className="w-full bg-transparent outline-none 
            text-base sm:text-lg placeholder:text-gray-500"
        />

        {/* Button */}
        <button type="submit">
          <Search className="w-6 h-6 text-gray-500" />
        </button>
      </form>
    </div>
  );
}
