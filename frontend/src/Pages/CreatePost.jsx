import React, { useState, useEffect } from "react";
import axios from "axios";
import { POST_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL se ID uthayega (e.g. /edit-post/123)
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    area: "",
    lookingForGender: "",
    fromDate: "",
    toDate: "",
    minStayDuration: "",
    budgetPerPerson: "",
    hasRoom: false,
    roomImages: "",
    totalRoomRent: "",
    rentPerRoommate: "",
    roomDescription: "",
    description: "",
  });

  
  // --- EDIT MODE: Fetch Existing Post Data ---
  useEffect(() => {
    if (!id) return; // Agar ID nahi hai, to fetch mat karo

    const fetchPost = async () => {
      try {
        const res = await axios.get(`${POST_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        const post = res.data.post;

        // Dates ko input type="date" ke format me convert karo
        setFormData({
          ...post,
          fromDate: post.fromDate ? post.fromDate.split("T")[0] : "",
          toDate: post.toDate ? post.toDate.split("T")[0] : "",
        });
      } catch (err) {
        toast.error("Failed to load post data");
        navigate("/my-post"); // Agar fetch fail ho to redirect
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`${POST_API_END_POINT}/update/${id}`, formData, {
          withCredentials: true,
        });
        toast.success("Post updated successfully! ✨");
      } else {
        await axios.post(`${POST_API_END_POINT}/create`, formData, {
          withCredentials: true,
        });
        toast.success("Vibe posted successfully! 🚀");
      }
      navigate("/my-post");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">
            {isEditMode ? "Modify Post" : "Create Post"}
          </h1>
          <div className="w-10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Location & Basics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                required
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Area
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. Bandra"
                required
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Looking For (Gender)
            </label>
            <input
              type="text"
              name="lookingForGender"
              value={formData.lookingForGender}
              onChange={handleChange}
              placeholder="Male / Female / Any"
              className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition"
            />
          </div>

          {/* Section 2: Dates & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition text-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Budget Per Person (₹)
              </label>
              <input
                type="number"
                name="budgetPerPerson"
                value={formData.budgetPerPerson}
                onChange={handleChange}
                required
                placeholder="5000"
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Min Stay (Days)
              </label>
              <input
                type="number"
                name="minStayDuration"
                value={formData.minStayDuration}
                onChange={handleChange}
                placeholder="30"
                className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition"
              />
            </div>
          </div>

          {/* Section 3: Room Toggle */}
          <div className="bg-[#1c1c1e] p-5 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Already have a room?</p>
              <p className="text-[10px] text-gray-500 uppercase">
                Toggle if you are looking for a roommate for your place
              </p>
            </div>
            <input
              type="checkbox"
              name="hasRoom"
              checked={formData.hasRoom}
              onChange={handleChange}
              className="w-6 h-6 rounded-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Section 4: Conditional Room Info */}
          {formData.hasRoom && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 bg-indigo-500/5 p-6 rounded-[30px] border border-indigo-500/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-indigo-400 uppercase">
                    Total Room Rent
                  </label>
                  <input
                    type="number"
                    name="totalRoomRent"
                    value={formData.totalRoomRent}
                    onChange={handleChange}
                    className="bg-black/40 p-4 rounded-2xl outline-none border border-white/5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-indigo-400 uppercase">
                    Rent Per Roommate
                  </label>
                  <input
                    type="number"
                    name="rentPerRoommate"
                    value={formData.rentPerRoommate}
                    onChange={handleChange}
                    className="bg-black/40 p-4 rounded-2xl outline-none border border-white/5"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-indigo-400 uppercase">
                  Room Images URL
                </label>
                <input
                  type="text"
                  name="roomImages"
                  value={formData.roomImages}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="bg-black/40 p-4 rounded-2xl outline-none border border-white/5"
                />
              </div>
            </motion.div>
          )}

          {/* Section 5: General Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              About the Vibe / Requirements
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself and what kind of roommate you want..."
              className="bg-[#1c1c1e] p-4 rounded-2xl outline-none border border-white/5 focus:border-indigo-500/50 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            type="submit"
            className="w-full bg-white text-black h-16 rounded-2xl font-black text-lg shadow-xl shadow-white/5 hover:bg-gray-200 transition disabled:opacity-50">
            {submitting ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : isEditMode ? (
              "SAVE CHANGES"
            ) : (
              "POST MY VIBE"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
