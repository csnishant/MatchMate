import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const texts = [
  "Search by city (Delhi, Pune...)",
  "Search by area (Andheri, Noida...)",
  "Search by roommate name...",
];

export default function SearchBar() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // 🔥 Typing animation
  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  // 🔍 Submit Search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    navigate(`/all-posts?search=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 pt-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0f172a]">
        Find the roommate
        <span className="text-blue-600 block">who fits your vibe,</span>
        <span className="text-white block">not just your space.</span>
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 px-6 py-3
          w-[90%] sm:w-[600px] md:w-[700px]
          rounded-full bg-white
          shadow-lg border border-gray-200">
        {/* Icon */}
        <Search className="w-5 h-5 text-gray-500" />

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={displayedText}
          className="w-full bg-transparent outline-none 
            text-base sm:text-lg placeholder:text-gray-400"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 
            rounded-full text-sm hover:bg-blue-700 transition">
          Search
        </button>
      </form>

      {/* Helper text */}
      <p className="text-sm text-white/80">
        Search posts by city, area, or roommate name
      </p>
    </div>
  );
}
