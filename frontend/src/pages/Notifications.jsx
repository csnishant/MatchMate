import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { REQUEST_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Trash2, Check, X } from "lucide-react";

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${REQUEST_API_END_POINT}/received`, {
        withCredentials: true,
      });
      setRequests(res.data.requests);
    } catch {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleResponse = async (id, status) => {
    try {
      await axios.put(
        `${REQUEST_API_END_POINT}/update/${id}`,
        { status },
        { withCredentials: true },
      );
      toast.success(`Marked as ${status}`);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req)),
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleRemove = async (id, status) => {
    if (status === "accepted") {
      toast("Accepted requests cannot be deleted!", { icon: "⚠️" });
      return;
    }

    if (window.confirm("Remove this notification from your list?")) {
      try {
        await axios.delete(`${REQUEST_API_END_POINT}/delete/${id}`, {
          withCredentials: true,
        });
        setRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success("Notification removed");
      } catch (error) {
        toast.error("Failed to delete from server");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-8 md:py-12 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header - Stays clean on all screens */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
              <Bell size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter italic uppercase">
              Requests
            </h2>
          </div>
          <span className="text-[9px] sm:text-[10px] font-black bg-white/10 px-3 py-1 rounded-full text-gray-400">
            {requests.length} TOTAL
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 italic text-gray-600 animate-pulse">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#1c1c1e] rounded-[30px] sm:rounded-[40px] border border-dashed border-white/10 px-6">
            <p className="text-gray-500 font-bold text-sm sm:text-base">
              No new requests found.
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence>
              {requests.map(({ _id, sender, status }) => (
                <motion.div
                  key={_id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1c1c1e] border border-white/5 rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 shadow-2xl transition-all">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
                    {/* User Info - Clickable Profile Area */}
                    <div
                      onClick={() => navigate(`/user-profile/${sender._id}`)}
                      className="flex items-center gap-3 sm:gap-4 cursor-pointer flex-grow min-w-0">
                      <img
                        src={
                          sender.profilePic ||
                          "https://avatar.iran.liara.run/public"
                        }
                        alt={sender.name}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl object-cover border-2 flex-shrink-0 transition-all ${
                          status === "accepted"
                            ? "border-green-500"
                            : status === "rejected"
                              ? "border-red-500"
                              : "border-white/10"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-sm sm:text-base tracking-tight truncate">
                          {sender.name}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest truncate">
                          {sender.gender} • {sender.age}
                        </p>
                        <div
                          className={`mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-tighter ${
                            status === "accepted"
                              ? "text-green-500"
                              : status === "rejected"
                                ? "text-red-500"
                                : "text-indigo-400"
                          }`}>
                          {status === "pending"
                            ? "• Awaiting Response"
                            : `• Currently ${status}`}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Centered on mobile, aligned right on desktop */}
                    <div className="flex items-center gap-2 w-full xs:w-auto justify-end xs:justify-start">
                      {/* Accept */}
                      <button
                        onClick={() => handleResponse(_id, "accepted")}
                        className={`flex-1 xs:flex-none p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex justify-center transition-all ${
                          status === "accepted"
                            ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}>
                        <Check size={16} sm:size={18} strokeWidth={3} />
                      </button>

                      {/* Reject */}
                      <button
                        onClick={() => handleResponse(_id, "rejected")}
                        className={`flex-1 xs:flex-none p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex justify-center transition-all ${
                          status === "rejected"
                            ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}>
                        <X size={16} sm:size={18} strokeWidth={3} />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(_id, status)}
                        className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${
                          status === "accepted"
                            ? "bg-white/5 text-gray-600 cursor-not-allowed opacity-50"
                            : "bg-white/5 text-gray-600 hover:text-red-500"
                        }`}
                        disabled={status === "accepted"}>
                        <Trash2 size={16} sm:size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="text-center text-[9px] sm:text-[10px] text-gray-600 mt-10 uppercase font-bold tracking-widest px-4">
          Tip: You can change your decision anytime by tapping the icons.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
