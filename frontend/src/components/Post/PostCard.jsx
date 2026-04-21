import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronDown,
  Sparkles,
  Zap,
  Eye,
  Users,
  Home,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!post || !post.user) return null;

  // Placeholder image logic
  const dummyImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    post.user.name || "User",
  )}&background=6366f1&color=fff`;

  const profileImage =
    post.user.profilePic && post.user.profilePic.trim() !== ""
      ? post.user.profilePic
      : dummyImage;

  const score = post.matchScore || 0;
  const strokeDashoffset = 176 - (176 * score) / 100;

  return (
    <motion.div
      layout
      className="w-full max-w-sm md:max-w-[400px] mx-auto bg-[#121214] border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30 mb-4">
      <div className="p-3 sm:p-4 flex flex-col gap-3">
        {/* TOP ROW: PFP + Name + Score */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Animated Profile Ring */}
            <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 176 }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="176"
                  className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]"
                />
              </svg>
              <img
                src={profileImage}
                className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full object-cover z-10 bg-zinc-800"
                alt={post.user.name}
                onError={(e) => {
                  e.target.src = dummyImage;
                }} // Fallback if URL fails
              />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-white font-bold text-sm sm:text-[15px] tracking-tight truncate">
                  {post.user.name}
                </h3>
                <div className="flex-shrink-0 flex items-center gap-1 bg-indigo-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-indigo-500/20">
                  <Sparkles
                    size={8}
                    className="text-indigo-400 fill-indigo-400"
                  />
                  <span className="text-[9px] sm:text-[10px] font-black text-indigo-400 italic">
                    {score}%
                  </span>
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1 font-bold uppercase tracking-tighter truncate">
                <MapPin size={10} className="text-indigo-500 flex-shrink-0" />{" "}
                {post.area || "Location N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => navigate(`/user-profile/${post.user._id}`)}
              className="p-2 sm:p-2.5 bg-white/5 hover:bg-white hover:text-black rounded-xl border border-white/5 transition-all active:scale-90"
              title="View Profile">
              <Eye size={14} className="sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-1.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
              <ChevronDown size={18} className="text-gray-600 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* COMPACT BUDGET BAR */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-600 uppercase">
                Budget
              </span>
              <span className="text-xs sm:text-sm font-black text-white leading-none">
                ₹{post.budgetPerPerson?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-600 uppercase">
                Status
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-bold leading-none ${post.hasRoom ? "text-emerald-400" : "text-amber-400"}`}>
                {post.hasRoom ? "HAS ROOM" : "NEED ROOM"}
              </span>
            </div>
          </div>
        </div>

        {/* EXPANDABLE SECTION */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              {/* AI INSIGHT */}
              <div className="mt-2 p-3 bg-gradient-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-xl sm:rounded-2xl relative">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Zap size={10} className="text-indigo-400 fill-indigo-400" />
                  <span className="text-[8px] sm:text-[9px] font-black text-indigo-300 uppercase tracking-widest">
                    AI Matching Analysis
                  </span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-gray-300 leading-snug font-medium italic mb-1">
                  "
                  {post.matchReason ||
                    "Great potential match based on your lifestyle preferences."}
                  "
                </p>
              </div>

              {/* DETAILED REQUIREMENTS */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Target size={12} className="text-pink-500" />
                    <span className="text-[8px] font-bold text-gray-500 uppercase">
                      Looking For
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-white font-semibold truncate block">
                    {post.lookingForGender || "Any"} Gender
                  </span>
                </div>

                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    {post.hasRoom ? (
                      <Users size={12} className="text-blue-400" />
                    ) : (
                      <Home size={12} className="text-orange-400" />
                    )}
                    <span className="text-[8px] font-bold text-gray-500 uppercase">
                      Intent
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-white font-semibold truncate block">
                    {post.hasRoom ? "Needs Roommate" : "Needs Room"}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION SECTION */}
              <div className="mt-3 px-1">
                <span className="text-[8px] font-bold text-gray-500 uppercase block mb-1">
                  About the Search
                </span>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed italic line-clamp-3 sm:line-clamp-none">
                  "{post.description || "No description provided."}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
