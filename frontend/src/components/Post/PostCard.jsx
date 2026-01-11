import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  Calendar,
  Clock,
  ChevronRight,
  Home,
  Search,
  Info,
  PhoneCall,
} from "lucide-react";
import axios from "axios";

export default function PostCard({ post, authToken }) {
  const [expanded, setExpanded] = useState(false);
  const [requestStatus, setRequestStatus] = useState("none");
  const [requestId, setRequestId] = useState(null);
  const [callInfo, setCallInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!post || !post.user) return null;

  // 1️⃣ Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });

  // 2️⃣ Fetch request status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`/api/requests/status/${post._id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setRequestStatus(res.data.status);
        setRequestId(res.data.requestId || null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, [post._id, authToken]);

  // 3️⃣ Send request
  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/requests/send/${post._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setRequestStatus(res.data.status); // should be "pending"
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error sending request");
    }
    setLoading(false);
  };

  // 4️⃣ Get call number (if accepted)
  const handleGetCall = async () => {
    try {
      const res = await axios.get(`/api/requests/call/${post._id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCallInfo(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Request not accepted yet");
    }
  };

  return (
    <motion.div
      layout
      className="w-full max-w-[500px] md:max-w-none mx-auto bg-[#1c1c1e] text-white rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
      <div className={`p-5 flex flex-col ${expanded ? "gap-6" : "gap-4"}`}>
        {/* HEADER */}
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

        {/* BADGES */}
        <div className="flex flex-wrap gap-2">
          <Badge
            icon={<User size={13} />}
            label="Looking for:"
            text={post.lookingForGender}
            color="bg-blue-500/10 text-blue-400 border border-blue-500/20"
          />
          <Badge
            icon={<Clock size={13} />}
            label="Stay:"
            text={`${post.minStayDuration} Months`}
            color="bg-purple-500/10 text-purple-400 border border-purple-500/20"
          />
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

              {post.hasRoom && (
                <div className="bg-white/5 rounded-3xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-2">
                    <Home size={14} /> My Room Details
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {post.roomDescription}
                  </p>
                </div>
              )}

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
          {/* ✅ REQUEST BUTTON */}
          {requestStatus === "none" && (
            <button
              disabled={loading}
              onClick={handleSendRequest}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
              Send Request
            </button>
          )}

          {requestStatus === "pending" && (
            <button className="flex-1 bg-gray-700 cursor-not-allowed py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
              Request Pending
            </button>
          )}

          {requestStatus === "accepted" && !callInfo && (
            <button
              onClick={handleGetCall}
              className="flex-1 bg-green-600 hover:bg-green-500 active:scale-95 transition-all py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
              Show Contact
            </button>
          )}

          {callInfo && (
            <a
              href={`tel:${callInfo.phone}`}
              className="flex-1 bg-green-600 hover:bg-green-500 active:scale-95 transition-all py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
              <PhoneCall size={18} /> {callInfo.name}: {callInfo.phone}
            </a>
          )}

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

// Badge Component
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

// DetailBox Component
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
