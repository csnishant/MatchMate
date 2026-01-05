import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  Calendar,
  Clock,
  MessageCircle,
  ChevronRight,
  Home,
  Users,
  Info,
  Search,
} from "lucide-react";

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  if (!post || !post.user) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  };

  return (
    <motion.div
      layout
      className="w-full max-w-[500px] md:max-w-none mx-auto bg-[#1c1c1e] text-white rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
      <div className={`p-5 flex flex-col ${expanded ? "gap-6" : "gap-4"}`}>
        {/* HEADER: User Info & Budget */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  post.user?.profilePic ||
                  "https://avatar.iran.liara.run/public"
                }
                alt={post.user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/20"
              />
              {post.hasRoom && (
                <div className="absolute -top-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-[#1c1c1e]">
                  <Home size={10} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {post.user.name}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={12} className="text-indigo-400" /> {post.area},{" "}
                {post.city}
              </p>
            </div>
          </div>

          <div className="bg-white/5 px-3 py-2 rounded-2xl border border-white/10 text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
              Budget
            </p>
            <p className="text-sm font-bold text-green-400">
              ₹{post.budgetPerPerson}
            </p>
          </div>
        </div>

        {/* CLEAR BADGES SECTION */}
        <div className="flex flex-wrap gap-2">
          {/* Gender Requirement Badge */}
          <Badge
            icon={<User size={13} />}
            label="Looking for:"
            text={post.lookingForGender}
            color="bg-blue-500/10 text-blue-400 border border-blue-500/20"
          />

          {/* Stay Duration Badge */}
          <Badge
            icon={<Clock size={13} />}
            label="Stay:"
            text={`${post.minStayDuration} Months`}
            color="bg-purple-500/10 text-purple-400 border border-purple-500/20"
          />

          {/* Room Status Badge */}
          {post.hasRoom ? (
            <Badge
              icon={<Home size={13} />}
              text="I have a Room"
              color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            />
          ) : (
            <Badge
              icon={<Search size={13} />}
              text="Looking for Room"
              color="bg-orange-500/10 text-orange-400 border border-orange-500/20"
            />
          )}
        </div>

        {/* EXPANDED CONTENT */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <DetailBox
                  label="Available From"
                  value={formatDate(post.fromDate)}
                  icon={<Calendar size={14} />}
                />
                <DetailBox
                  label="Available Till"
                  value={formatDate(post.toDate)}
                  icon={<Calendar size={14} />}
                />
              </div>

              {/* Room Specifics - Shown only if poster has a room */}
              {post.hasRoom && (
                <div className="bg-white/5 rounded-3xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-2">
                    <Home size={14} /> My Room Details
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {post.roomDescription}
                  </p>

                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">
                        Total Flat Rent
                      </p>
                      <p className="font-bold tracking-tight">
                        ₹{post.totalRoomRent}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 uppercase">
                        Your Share
                      </p>
                      <p className="font-bold text-green-400">
                        ₹{post.rentPerRoommate}
                      </p>
                    </div>
                  </div>

                  {post.roomImages?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {post.roomImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="w-40 h-28 object-cover rounded-2xl flex-shrink-0"
                          alt="Room"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* General Description */}
              <div className="px-1">
                <h4 className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-2 mb-1">
                  <Info size={14} /> About this post
                </h4>
                <p className="text-sm text-gray-300 italic">
                  "{post.description}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 pt-2">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
            <MessageCircle size={18} /> Chat
          </button>

          <Link
            to={`/user-profile/${post.user._id}`}
            className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 active:scale-95 transition-all">
            <ChevronRight size={20} />
          </Link>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-auto">
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ENHANCED UI COMPONENTS
function Badge({ icon, label, text, color }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold ${color}`}>
      {icon}
      <span>
        {label && <span className="opacity-70 mr-1 font-medium">{label}</span>}
        {text}
      </span>
    </div>
  );
}

function DetailBox({ label, value, icon }) {
  return (
    <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-start gap-2">
      <div className="mt-1 text-indigo-400">{icon}</div>
      <div>
        <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter">
          {label}
        </p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
