import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  User,
  Home,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  if (!post || !post.user) return null;

  return (
    <div className="w-full max-w-[450px] mx-auto bg-[#1c1c1e]/80 backdrop-blur-md text-white rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-indigo-500/30">
      {/* AI MATCH SCORE BADGE - Naya Add kiya gaya */}
      {post.matchScore !== undefined && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full backdrop-blur-xl">
          <Sparkles  size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-black text-yellow-400 uppercase tracking-tighter">
            {post.matchScore}% Match
          </span>
        </div>
      )}
      <div className="p-6 flex flex-col gap-5">
        {/* HEADER SECTION */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  post.user.profilePic || "https://avatar.iran.liara.run/public"
                }
                alt={post.user.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/5"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1c1c1e] rounded-full"></div>
            </div>

            <div>
              <h3 className="font-bold text-lg tracking-tight leading-none mb-1">
                {post.user.name}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <MapPin size={14} className="text-indigo-400" /> {post.area},{" "}
                {post.city}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-transparent px-4 py-2 rounded-2xl text-right border border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Budget
            </p>
            <p className="text-lg font-black text-green-400">
              ₹{post.budgetPerPerson.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* BADGES SECTION */}
        <div className="flex flex-wrap gap-2">
          <Badge
            icon={<User size={14} />}
            text={post.lookingForGender}
            className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
          />

          {post.hasRoom ? (
            <Badge
              icon={<Home size={14} />}
              text="Has Room"
              className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            />
          ) : (
            <Badge
              icon={<Search size={14} />}
              text="Looking for Room"
              className="bg-amber-500/10 text-amber-400 border border-amber-500/20"
            />
          )}
        </div>

        {/* DESCRIPTION SECTION - Isme Match Reason bhi dikha sakte hain */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-60" : "max-h-0"}`}>
          <div className="pt-2 text-sm text-gray-400 leading-relaxed italic border-t border-white/5 mt-2 flex flex-col gap-3">
            <p>"{post.description}"</p>

            {/* AI Reason dikhane ke liye */}
            {post.matchReason && (
              <div className="bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 not-italic">
                <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">
                  AI Insights
                </p>
                <p className="text-xs text-gray-300">{post.matchReason}</p>
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 mt-2">
          <button className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.97] transition-all py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/20">
            <MessageCircle size={18} />
            Connect
          </button>

          <Link
            to={`/user-profile/${post.user._id}`}
            className="flex-1 text-center py-3.5 bg-white/5 hover:bg-white/10 active:scale-[0.97] transition-all rounded-2xl font-semibold border border-white/10">
            Profile
          </Link>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-3 text-gray-400 hover:text-white transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, text, className }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${className}`}>
      {icon}
      {text}
    </div>
  );
}
