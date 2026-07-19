import React, { useEffect, useState } from "react";
// 🔥 Trash2 icon import kiya delete button ke liye
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion"; // 🔥 AnimatePresence add kiya smooth delete ke liye
import { fetchMyRequestsData, deleteSentRequestApi } from "../api/requestApi"; // 🔥 delete API import ki
import { toast } from "react-hot-toast"; // Agar toast use kar rahe hain notification ke liye

export default function MyRequests() {
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    let isMounted = true; //create a switch to check if this page is still open

    const getRequests = async () => {
      try {
        const data = await fetchMyRequestsData(); //try to fetch the data from the server
        if (isMounted) setSentRequests(data || []);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        toast.error("Could not load your requests.");
      } finally {
        if (isMounted) setLoading(false); //this code always runs to turn off the loading animation safely
      }
    };

    getRequests();
    return () => {
      isMounted = false;
    };
  }, []);

  // 🔥 DELETE HANDLER: Request ko delete karne aur UI update karne ke liye
  const handleDeleteRequest = async (requestId) => {
    // Basic confirmation prompt
    if (
      !window.confirm(
        "Are you sure you want to remove this request from history?",
      )
    )
      return;

    try {
      const response = await deleteSentRequestApi(requestId);

      if (response.success) {
        // ✅ UI se hatane ke liye state update karein
        setSentRequests((prev) => prev.filter((req) => req._id !== requestId));
        toast.success(response.message || "Request removed.");
      } else {
        // ❌ Agar backend mana kare (e.g., status is accepted)
        toast.error(response.message || "Failed to delete.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  // Status Badge Design Config
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          icon: <CheckCircle2 size={14} />,
          text: "Accepted",
        };
      case "rejected":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          icon: <XCircle size={14} />,
          text: "Rejected",
        };
      default:
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          icon: <Clock size={14} />,
          text: "Pending",
        };
    }
  };

  // This is a simple helper function to make dates look pretty (e.g., "Jul 19")
  // We keep it out of the main HTML layout loop to make the code faster
  const formDate = (dateString) => {
    // If there is no date, return nothing to prevent errors
    if (!dateString) return "";

    // Convert the text into a clean readable date format
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-stone-400 text-sm font-mono">
        Loading outbound requests...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Structural Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Sent Requests <ArrowRight size={18} className="text-indigo-400" />
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Track people you have reached out to for matching slots or rooms.
        </p>
      </div>

      {sentRequests.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-white/10 rounded-2xl bg-transparent backdrop-blur-md">
          <p className="text-stone-400 text-sm font-medium">
            You haven't sent any requests yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {/* 🔥 AnimatePresence baki cards ko smooth re-position karta hai jab ek delete hota hai */}
          <AnimatePresence initial={false}>
            {sentRequests.map((req) => {
              const statusConfig = getStatusStyle(req.status);
              const receiver = req.receiver;

              return (
                <motion.div
                  key={req._id}
                  layout // 🔥 Smooth layout transition ke liye
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }} // 🔥 Delete animation
                  transition={{ duration: 0.3 }}
                  className="w-full flex items-center justify-between p-4 bg-transparent backdrop-blur-xl border border-white/5 rounded-2xl hover:border-white/10 transition-all shadow-lg gap-4">
                  {/* Left Section: Receiver Identity */}
                  <div className="flex items-center gap-4 min-w-0 flex-grow">
                    <Link
                      to={`/user-profile/${receiver?._id}`}
                      className="flex items-center gap-4 min-w-0 hover:opacity-85 transition-opacity cursor-pointer group">
                      <Avatar className="w-11 h-11 border border-white/10 flex-shrink-0">
                        <AvatarImage
                          src={receiver?.profilePic}
                          alt={receiver?.name}
                        />
                        <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                          {receiver?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                          {receiver?.name || "MatchMate User"}
                        </h4>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-stone-500 mt-0.5">
                          Sent on:{formDate(req.createdAt)}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Right Section: Status & Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold font-mono ${statusConfig.bg}`}>
                      {statusConfig.icon}
                      <span>{statusConfig.text}</span>
                    </div>

                    {/* 🔥 DELETE BUTTON: Sirf non-accepted requests ke liye dikhayenge (Optional check, backend handles security) */}
                    {req.status !== "accepted" && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteRequest(req._id)}
                        className="p-2 rounded-lg bg-stone-900/50 border border-white/5 text-stone-500 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all"
                        title="Remove from history">
                        <Trash2 size={16} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
