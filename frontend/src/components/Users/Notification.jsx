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
        { withCredentials: true }
      );

      toast.success(`Marked as ${status}`);

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  // ✅ SAFE DELETE
  // ✅ UPDATED SAFE DELETE (With API Call)
  const handleRemove = async (id, status) => {
    if (status === "accepted") {
      toast("Accepted requests cannot be deleted!", { icon: "⚠️" });
      return;
    }

    if (window.confirm("Remove this notification from your list?")) {
      try {
        // 1. Backend se delete karne ke liye API call karein
        // Note: Apne backend route ke hisaab se URL check kar lein (e.g., /delete/:id ya /ignore/:id)
        await axios.delete(`${REQUEST_API_END_POINT}/delete/${id}`, {
          withCredentials: true,
        });

        // 2. Agar API successful ho, tabhi UI se remove karein
        setRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success("Notification permanently removed");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete from server");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
              <Bell size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter italic uppercase">
              Requests
            </h2>
          </div>
          <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full text-gray-400">
            {requests.length} TOTAL
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 italic text-gray-600">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 bg-[#1c1c1e] rounded-[40px] border border-dashed border-white/10">
            <p className="text-gray-500 font-bold">No new requests found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {requests.map(({ _id, sender, status }) => (
                <motion.div
                  key={_id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1c1c1e] border border-white/5 rounded-[32px] p-5 shadow-2xl transition-all">
                  <div className="flex items-center justify-between gap-4">
                    {/* User Info */}
                    <div
                      onClick={() => navigate(`/user-profile/${sender._id}`)}
                      className="flex items-center gap-4 cursor-pointer flex-grow">
                      <img
                        src={sender.profilePic || "/default.jpg"}
                        alt={sender.name}
                        className={`w-14 h-14 rounded-2xl object-cover border-2 transition-all ${
                          status === "accepted"
                            ? "border-green-500"
                            : status === "rejected"
                            ? "border-red-500"
                            : "border-white/10"
                        }`}
                      />
                      <div>
                        <p className="font-bold text-sm tracking-tight">
                          {sender.name}
                        </p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                          {sender.gender} • {sender.age}
                        </p>
                        <div
                          className={`mt-1 text-[9px] font-black uppercase tracking-tighter ${
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

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Accept */}
                      <button
                        onClick={() => handleResponse(_id, "accepted")}
                        className={`p-3 rounded-2xl transition-all ${
                          status === "accepted"
                            ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}>
                        <Check size={18} strokeWidth={3} />
                      </button>

                      {/* Reject */}
                      <button
                        onClick={() => handleResponse(_id, "rejected")}
                        className={`p-3 rounded-2xl transition-all ${
                          status === "rejected"
                            ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}>
                        <X size={18} strokeWidth={3} />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(_id, status)}
                        className={`p-3 rounded-2xl transition-colors ${
                          status === "accepted"
                            ? "bg-white/5 text-gray-500 cursor-not-allowed opacity-50"
                            : "bg-white/5 text-gray-600 hover:text-red-500"
                        }`}
                        disabled={status === "accepted"}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="text-center text-[10px] text-gray-600 mt-10 uppercase font-bold tracking-widest">
          Tip: You can change your decision anytime by tapping the icons.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
