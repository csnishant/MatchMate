import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";

const users = [
  {
    name: "Samantha",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    university: "Delhi University",
    course: "BCA",
    tags: ["Early Riser", "Non-Smoker", "Quiet"],
  },
  {
    name: "Raj",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    university: "IIT Bombay",
    course: "M.Tech",
    tags: ["Night Owl", "Music Lover", "Clean"],
  },
  {
    name: "Ananya",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    university: "BITS Pilani",
    course: "MBA",
    tags: ["Vegetarian", "Calm", "Non-Smoker"],
  },
  {
    name: "Aman",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    university: "NIT Trichy",
    course: "B.Tech",
    tags: ["Early Riser", "Gym Lover", "Quiet"],
  },
  {
    name: "Priya",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    university: "JNU",
    course: "M.A.",
    tags: ["Book Lover", "Clean", "Non-Smoker"],
  },
];

export default function Community() {
  return (
    <div className="w-full py-20 bg-black overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-end px-6 mb-12 gap-4">
        <div>
          <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            The Vibe Tribe
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
            Meet our <span className="text-indigo-500">Community</span>
          </h2>
        </div>

        <Link
          to="/allusers"
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase">
          Explore All{" "}
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Horizontal Carousel with Snapping */}
      <div className="flex gap-6 overflow-x-auto px-6 pb-10 scrollbar-hide snap-x snap-mandatory">
        {users.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="min-w-[300px] snap-center bg-[#1c1c1e] rounded-[40px] border border-white/5 p-8 flex flex-col items-center relative overflow-hidden group shadow-2xl">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Profile Image with Squircle border */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-[30px] object-cover border-2 border-white/10 relative z-10 p-1"
              />
            </div>

            {/* User Details */}
            <h3 className="text-2xl font-black text-white tracking-tight mb-1">
              {user.name}
            </h3>
            <div className="text-center mb-6">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                {user.university}
              </p>
              <p className="text-[10px] text-indigo-400/80 font-black">
                {user.course}
              </p>
            </div>

            {/* Tags with iOS Glass style */}
            <div className="flex gap-2 flex-wrap justify-center mb-8">
              {user.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-300 uppercase tracking-tighter">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-white text-black rounded-[22px] font-black text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              View Profile <ArrowUpRight size={14} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
