import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Edit3,
  Eye,
  EyeOff,
  MapPin,
  Plus,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { createPost, getMyPost, togglePostStatus, updatePost } from "../api/postApi";

// Input component
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-gray-500 mb-1 block">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
      />
    </div>
  );
}

export default function MyPostPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(null);

  const [formData, setFormData] = useState({
    city: "",
    area: "",
    lookingForGender: "ANY",
    budgetPerPerson: "",
    hasRoom: false,
    totalRoomRent: "",
    description: "",
  });

  // Fetch post
  const fetchMyPost = async () => {
    try {
      const res = await getMyPost();
      setPost(res.data.posts[0] || null);
    } catch (err) {
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchMyPost();
  }, [user]);

  // Toggle visibility
  const handleToggleStatus = async () => {
    try {
      const res = await togglePostStatus(post._id);
      setPost({ ...post, isActive: res.data.isActive });
      toast.success("Status Updated");
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  // Edit post
  const openEdit = () => {
    setFormData({
      city: post.city || "",
      area: post.area || "",
      lookingForGender: post.lookingForGender || "ANY",
      budgetPerPerson: post.budgetPerPerson || "",
      hasRoom: !!post.hasRoom,
      totalRoomRent: post.totalRoomRent || "",
      description: post.description || "",
    });
    setView("form");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const payload = {
    ...formData,
    budgetPerPerson: Number(formData.budgetPerPerson),
    totalRoomRent: formData.hasRoom ? Number(formData.totalRoomRent) : null,
    lookingForGender: formData.lookingForGender.toLowerCase(),
  };

  try {
    if (post) {
      await updatePost(post._id, payload);
    } else {
      await createPost(payload);
    }

    toast.success("Saved Successfully!");
    fetchMyPost();
    setView("list");
  } catch (err) {
    toast.error(err.response?.data?.message || "Submission failed");
  } finally {
    setSubmitting(false);
  }
};

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto">
        {view === "list" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-black uppercase">My Post</h1>
              {!post && (
                <button
                  onClick={() => setView("form")}
                  className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2">
                  <Plus size={16} /> CREATE
                </button>
              )}
            </div>

            {post ? (
              <div className="space-y-4">
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/10">
                  <div className="flex justify-between mb-4">
                    <div className="flex gap-2 items-center">
                      <MapPin size={18} className="text-indigo-400" />
                      <span className="font-bold">
                        {post.area}, {post.city}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${post.isActive ? "bg-green-500 text-black" : "bg-red-500"}`}>
                      {post.isActive ? "LIVE" : "HIDDEN"}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-400">
                    ₹{post.budgetPerPerson} / person
                  </p>
                </div>

                <div className="bg-[#1c1c1e] rounded-3xl border border-white/10 flex flex-col divide-y divide-white/5">
                  <button
                    onClick={handleToggleStatus}
                    className="p-4 flex gap-3 items-center font-bold">
                    {post.isActive ? <EyeOff /> : <Eye />} Toggle Visibility
                  </button>
                  <button
                    onClick={openEdit}
                    className="p-4 flex gap-3 items-center font-bold">
                    <Edit3 /> Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-[#1c1c1e] rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-500 mb-4">No post found</p>
                <button
                  onClick={() => setView("form")}
                  className="bg-indigo-600 px-6 py-2 rounded-xl font-bold">
                  Post Now
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}>
            <button
              onClick={() => setView("list")}
              className="mb-6 flex items-center gap-2 text-gray-400 font-bold text-xs">
              <ChevronLeft size={16} /> Back
            </button>

            <h1 className="text-2xl font-bold mb-8">
              {post ? "Edit Post" : "Create Post"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  label="City"
                  required
                />
                <Input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  label="Area"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  name="budgetPerPerson"
                  value={formData.budgetPerPerson || ""}
                  onChange={handleChange}
                  label="Budget (per person)"
                  required
                />
                <select
                  name="lookingForGender"
                  value={formData.lookingForGender}
                  onChange={handleChange}
                  className="bg-[#1c1c1e] border border-white/10 rounded-xl px-4 py-3">
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <label className="flex justify-between p-4 bg-[#1c1c1e] rounded-xl">
                <span>I have a room</span>
                <input
                  type="checkbox"
                  name="hasRoom"
                  checked={formData.hasRoom}
                  onChange={handleChange}
                />
              </label>

              {formData.hasRoom && (
                <Input
                  type="number"
                  name="totalRoomRent"
                  value={formData.totalRoomRent || ""}
                  onChange={handleChange}
                  label="Total Rent"
                />
              )}

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description..."
                className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-4"
              />

              <button className="w-full py-4 bg-white text-black font-bold rounded-xl">
                {submitting ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
