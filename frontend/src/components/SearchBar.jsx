import React, { useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["Search by city...", "Search by area...", "Find by roommate..."];

export default function SearchBar() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

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
    <div className="w-full flex flex-col items-center px-4 sm:px-6">
      {/* iOS STYLE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-10">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
          Find your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            vibe.
          </span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-2 font-medium tracking-widest uppercase opacity-80">
          Roommates • Spaces • Community
        </p>
      </motion.div>

      {/* SEARCH CONTAINER */}
      <div className="relative w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white/10 backdrop-blur-3xl rounded-2xl sm:rounded-[1.5rem] border border-white/20 p-1.5 pl-4 transition-all duration-300 focus-within:bg-white/15 focus-within:ring-4 focus-within:ring-indigo-500/20 shadow-2xl">
          {/* Leading Icon - Hidden on very small screens to save space */}
          <Search className="hidden xs:block w-5 h-5 text-gray-400 flex-shrink-0" />

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={displayedText}
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-3 text-white text-base sm:text-lg placeholder:text-gray-500 font-medium min-w-0"
          />

          {/* Clear Button */}
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

          {/* Action Button - Responsive Text */}
          <button
            type="submit"
            className="bg-white text-black font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-[1.2rem] hover:bg-gray-200 transition-all active:scale-95 text-sm sm:text-base flex-shrink-0">
            <span className="hidden xs:inline">Search</span>
            <Search className="xs:hidden w-5 h-5" /> {/* Only icon on mobile */}
          </button>
        </form>

        {/* QUICK TAGS - Optimized for touch scrolling */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 px-1 -mx-1 mask-linear-gradient">
          <QuickTag text="Delhi" onClick={() => setInput("Delhi")} />
          <QuickTag text="Mumbai" onClick={() => setInput("Mumbai")} />
          <QuickTag
            text="Female Roommates"
            onClick={() => setInput("Female")}
          />
          <QuickTag text="Budget < 10k" onClick={() => setInput("10000")} />
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function QuickTag({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 bg-[#1c1c1e] border border-white/10 text-gray-300 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap hover:bg-white/15 transition-all active:scale-90 border-opacity-50 shadow-sm">
      <MapPin size={12} className="text-indigo-400" />
      {text}
    </button>
  );
}
