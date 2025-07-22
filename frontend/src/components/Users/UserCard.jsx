import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ViewProfileModal from "./ViewProfileModal";
import {
  Eye,
  MapPin,
  Send,
  ShowerHead,
  Sparkles,
  View,
  ViewIcon,
  Watch,
  WatchIcon,
} from "lucide-react";
import { FaShower } from "react-icons/fa";

export default function UserCard({ user, requestStatus, sendRequest }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out rounded-3xl p-5 md:p-6 
        border border-white/10 shadow-xl bg-gradient-to-bl from-[#0f172a] to-indigo-950 hover:shadow-2xl 
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Top Section */}
      <div className="flex items-center gap-4">
        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <img
            src={user.profilePic || "/default-profile.png"}
            alt="profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition-transform"
          />
          <span className="absolute bottom-0 right-0 bg-green-400 border-2 border-white rounded-full w-4 h-4"></span>
        </div>

        {/* User Info */}
        <div className="flex-1 text-white">
          <h3 className="text-xl font-semibold">{user.name || "Unknown"}</h3>
          <p className="text-sm text-white/80">
            {user.age || "N/A"} • {user.gender || "N/A"}
          </p>
          <div className="flex items-center gap-1 text-sm text-white/70 mt-1">
            <MapPin size={14} />
            {user.location || "No Location"}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 text-purple-300">
            <Sparkles size={14} />
            Profile Match Score: {user.matchScore || "80%"}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap justify-center sm:justify-end gap-3">
        {/* View Profile */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-1.5 text-sm font-medium bg-white/10 text-purple-300 rounded-full border border-purple-400 hover:bg-white/20 shadow-md backdrop-blur-sm transition-all">
          <Eye />
        </button>

        {/* Conditionally Render Buttons */}
        {requestStatus === "accepted" ? (
          <Link to={`/chat/${user._id}`}>
            <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition">
              💬 Chat
            </button>
          </Link>
        ) : requestStatus === "pending" ? (
          <button
            disabled
            className="px-4 py-1.5 text-sm bg-gray-400/50 text-white/60 rounded-full cursor-not-allowed shadow-md">
            ⏳ Pending
          </button>
        ) : (
          <Tooltip title="Send roommate request">
            <button
              onClick={() => sendRequest(user._id)}
              className="px-4 py-1.5 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition">
              <Send />
            </button>
          </Tooltip>
        )}
      </div>

      {/* Modal */}
      {open && <ViewProfileModal user={user} onClose={() => setOpen(false)} />}
    </div>
  );
}
