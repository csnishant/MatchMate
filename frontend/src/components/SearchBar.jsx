import React, { useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  "Search by city (Delhi, Pune...)",
  "Search by area (Andheri, Noida...)",
  "Find by roommate name...",
];

export default function SearchBar() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // 🔥 Typing animation (Smooth iOS Style)
  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 60);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate(`/all-posts?search=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* iOS STYLE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
          Find your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            vibe.
          </span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2 font-medium tracking-wide uppercase">
          Roommates, Spaces, Community
        </p>
      </motion.div>

      {/* SEARCH CONTAINER (GLASSMORPHISM) */}
      <div className="relative w-full max-w-2xl group">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white/10 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 p-2 pl-5 transition-all duration-300 focus-within:bg-white/15 focus-within:ring-4 focus-within:ring-indigo-500/20 shadow-2xl">
          {/* Leading Icon */}
          <Search className="w-5 h-5 text-gray-400" />

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={displayedText}
            className="flex-grow bg-transparent border-none outline-none px-3 py-3 text-white text-lg placeholder:text-gray-500 font-medium"
          />

          {/* Clear Button (iOS feature) */}
          <AnimatePresence>
            {input && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => setInput("")}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 mr-1">
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <button
            type="submit"
            className="bg-white text-black font-bold px-6 py-3 rounded-[1.2rem] hover:bg-gray-200 transition-all active:scale-95 text-sm md:text-base">
            Search
          </button>
        </form>

        {/* RECENT SEARCHES / SUGGESTIONS DROPDOWN (UI only) */}
        <div className="absolute top-full left-0 w-full mt-3 flex gap-2 overflow-x-auto no-scrollbar py-2">
          <QuickTag text="Delhi" onClick={() => setInput("Delhi")} />
          <QuickTag text="Mumbai" onClick={() => setInput("Mumbai")} />
          <QuickTag
            text="Female Roommates"
            onClick={() => setInput("Female")}
          />
          <QuickTag text="Budget < 10k" onClick={() => setInput("10000")} />
        </div>
      </div>
    </div>
  );
}

// Small Helper Component for iOS-style chips
function QuickTag({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1c1c1e] border border-white/5 text-gray-300 text-xs font-semibold rounded-full whitespace-nowrap hover:bg-white/10 transition-colors active:scale-95">
      <MapPin size={10} className="text-indigo-400" />
      {text}
    </button>
  );
}
