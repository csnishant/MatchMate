import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { POST_API_END_POINT } from "@/utils/constant";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Plus,
  Loader2,
  ChevronRight,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux"; // 1. Redux import karein

const MyPost = () => {
  const navigate = useNavigate();
  // 2. User state nikalna
  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Login Check Logic
  useEffect(() => {
    if (!user) {
      toast.error("Please login to see your posts");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch current user's post
  const fetchMyPost = async () => {
    try {
      const res = await axios.get(`${POST_API_END_POINT}/my-post`, {
        withCredentials: true,
      });
      setPost(res.data.posts[0] || null);
    } catch (err) {
      // Agar error unauthorized ka hai (401), to login par bhej sakte hain
      if (err.response?.status === 401) {
        navigate("/login");
      }
      toast.error("Failed to load your post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyPost();
    }
  }, [user]);

  // ✅ Toggle Visibility
  const handleToggleStatus = async () => {
    try {
      const res = await axios.put(
        `${POST_API_END_POINT}/toggle/${post._id}`,
        {},
        { withCredentials: true }
      );
      setPost({ ...post, isActive: res.data.isActive });
      toast.success(
        res.data.isActive ? "Post is now Live! 🌍" : "Post is now Hidden 🔒"
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // ✅ Delete Post
  const handleDelete = async () => {
    if (
      !window.confirm("Are you sure you want to delete this post permanently?")
    )
      return;
    try {
      await axios.delete(`${POST_API_END_POINT}/delete/${post._id}`, {
        withCredentials: true,
      });
      setPost(null);
      toast.success("Post deleted permanently");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // 4. Guard Clause: Agar user nahi hai to white screen/flicker na ho
  if (!user) return null;

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Your Listing
            </p>
            <h1 className="text-4xl font-black tracking-tighter italic">
              MY POST
            </h1>
          </div>
          {!post && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-post")}
              className="bg-white text-black h-10 px-4 rounded-full flex items-center gap-2 font-bold text-xs">
              <Plus size={16} /> CREATE
            </motion.button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {post ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">
              {/* Hero Status Card */}
              <div className="bg-[#1c1c1e] p-8 rounded-[40px] border border-white/5 relative overflow-hidden shadow-2xl">
                <div
                  className={`absolute top-0 right-0 px-6 py-2 rounded-bl-[20px] text-[10px] font-black uppercase tracking-widest ${
                    post.isActive
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                  }`}>
                  {post.isActive ? "Live" : "Hidden"}
                </div>

                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-indigo-500/10 rounded-[20px] flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">
                      {post.area}
                    </h2>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">
                      {post.city}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
                    <p className="text-gray-500 text-[9px] uppercase font-black mb-1 tracking-wider">
                      Budget
                    </p>
                    <p className="text-xl font-black text-indigo-400 italic">
                      ₹{post.budgetPerPerson}
                    </p>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
                    <p className="text-gray-500 text-[9px] uppercase font-black mb-1 tracking-wider">
                      Available
                    </p>
                    <p className="text-lg font-bold">
                      {new Date(post.fromDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              <div className="bg-[#1c1c1e] rounded-[35px] overflow-hidden divide-y divide-white/5 border border-white/5 shadow-xl">
                <button
                  onClick={handleToggleStatus}
                  className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-xl ${
                        post.isActive
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}>
                      {post.isActive ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                    <span className="font-bold text-sm">
                      {post.isActive ? "Hide from Explore" : "Make Post Public"}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-700 group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={() => navigate(`/create-post/${post._id}`)}
                  className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                      <Edit3 size={20} />
                    </div>
                    <span className="font-bold text-sm">Edit Post Details</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-700 group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-between px-7 py-6 hover:bg-red-500/5 transition-all group">
                  <div className="flex items-center gap-4 text-red-500">
                    <div className="p-2.5 rounded-xl bg-red-500/10">
                      <Trash2 size={20} />
                    </div>
                    <span className="font-bold text-sm">
                      Delete Permanently
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-red-900 uppercase pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Danger
                  </span>
                </button>
              </div>

              {/* Tips Section */}
              <div className="flex items-start gap-3 px-4 py-2 opacity-50">
                <Info size={14} className="mt-1" />
                <p className="text-[11px] font-medium leading-relaxed">
                  Keeping your post "Live" allows others to see your
                  requirements.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-[#1c1c1e] rounded-[50px] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={32} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">
                NO ACTIVE POST
              </h3>
              <p className="text-gray-500 text-sm max-w-[220px] mx-auto font-medium mb-10 leading-relaxed">
                You haven't posted any requirements yet.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/create-post")}
                className="bg-indigo-600 px-10 py-4 rounded-[22px] font-black text-sm shadow-xl shadow-indigo-500/20 uppercase tracking-widest">
                Get Started
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyPost;
