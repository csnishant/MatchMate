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
  Search,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!post || !post.user) return null;

  const score = post.matchScore || 0;
  const strokeDashoffset = 176 - (176 * score) / 100;

  return (
    <motion.div
      layout
      className="w-full max-w-[400px] mx-auto bg-[#121214] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30 mb-3">
      <div className="p-4 flex flex-col gap-3">
        {/* TOP ROW: PFP + Name + Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-14 h-14">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 176 }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="176"
                  className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]"
                />
              </svg>
              <img
                src={
                  post.user.profilePic || "https://avatar.iran.liara.run/public"
                }
                className="w-[42px] h-[42px] rounded-full object-cover z-10"
                alt="pfp"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-[15px] tracking-tight">
                  {post.user.name}
                </h3>
                <div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  <Sparkles
                    size={10}
                    className="text-indigo-400 fill-indigo-400"
                  />
                  <span className="text-[10px] font-black text-indigo-400 italic">
                    {score}%
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1 font-bold uppercase tracking-tighter">
                <MapPin size={10} className="text-indigo-500" /> {post.area}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/user-profile/${post.user._id}`)}
              className="p-2.5 bg-white/5 hover:bg-white hover:text-black rounded-xl border border-white/5 transition-all active:scale-90">
              <Eye size={16} />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-1.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
              <ChevronDown size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* COMPACT BUDGET BAR */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-600 uppercase">
                Budget
              </span>
              <span className="text-sm font-black text-white leading-none">
                ₹{post.budgetPerPerson?.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-600 uppercase">
                Current Status
              </span>
              <span
                className={`text-[10px] font-bold leading-none ${post.hasRoom ? "text-emerald-400" : "text-amber-400"}`}>
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
              <div className="mt-2 p-3 bg-gradient-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-2xl relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={10} className="text-indigo-400 fill-indigo-400" />
                  <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">
                    AI Matching Analysis
                  </span>
                </div>
                <p className="text-[12px] text-gray-300 leading-snug font-medium italic mb-2">
                  "
                  {post.matchReason ||
                    "Great potential match based on your lifestyle preferences."}
                  "
                </p>
              </div>

              {/* DETAILED REQUIREMENTS */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {/* Looking For Gender */}
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Target size={12} className="text-pink-500" />
                    <span className="text-[8px] font-bold text-gray-500 uppercase">
                      Looking For
                    </span>
                  </div>
                  <span className="text-[11px] text-white font-semibold">
                    {post.lookingForGender || "Any"} Gender
                  </span>
                </div>

                {/* Preference Status */}
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
                  <span className="text-[11px] text-white font-semibold">
                    {post.hasRoom ? "Needs Roommate" : "Needs Room & Roommate"}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION SECTION */}
              <div className="mt-3 px-1">
                <span className="text-[8px] font-bold text-gray-500 uppercase block mb-1">
                  About the Search
                </span>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{post.description}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
