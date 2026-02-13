import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Loader2,
  MapPin,
  Calendar,
  IndianRupee,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import { POST_API_END_POINT } from "@/utils/constant";

const initialFormState = {
  city: "",
  area: "",
  lookingForGender: "ANY",
  fromDate: "",
  toDate: "",
  minStayDuration: "",
  budgetPerPerson: "",
  hasRoom: false,
  roomImages: [],
  totalRoomRent: "",
  rentPerRoommate: "",
  description: "",
};

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${POST_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        const post = res?.data?.post;
        if (!post) throw new Error("Invalid response");
        setFormData({
          ...post,
          fromDate: post.fromDate?.slice(0, 10) || "",
          toDate: post.toDate?.slice(0, 10) || "",
          hasRoom: Boolean(post.hasRoom),
        });
      } catch (err) {
        toast.error("Unable to load post");
        navigate("/my-post");
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
    if (formData.toDate < formData.fromDate) {
      toast.error("To Date cannot be before From Date");
      return;
    }
    const payload = {
      ...formData,
      budgetPerPerson: Number(formData.budgetPerPerson),
      minStayDuration: Number(formData.minStayDuration),
      totalRoomRent: Number(formData.totalRoomRent),
      rentPerRoommate: Number(formData.rentPerRoommate),
    };
    if (!payload.hasRoom) {
      payload.totalRoomRent = null;
      payload.rentPerRoommate = null;
      payload.roomImages = [];
    }

    setSubmitting(true);
    try {
      const method = isEditMode ? "put" : "post";
      const url = isEditMode
        ? `${POST_API_END_POINT}/update/${id}`
        : `${POST_API_END_POINT}/create`;
      await axios[method](url, payload, { withCredentials: true });
      toast.success(isEditMode ? "Post updated!" : "Post created!");
      navigate("/my-post");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
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

  // Common Input Style
  const inputStyle =
    "w-full bg-[#1c1c1e] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-600";
  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 border border-white/5 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            {isEditMode ? "Modify Vibe" : "New Post"}
          </h1>
          <div className="w-12" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Location */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest px-1">
              <MapPin size={14} /> Location Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Area</label>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Bandra"
                  required
                  className={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* Section: Preferences */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest px-1">
              <Calendar size={14} /> Schedule & Gender
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Looking For</label>
                <select
                  name="lookingForGender"
                  value={formData.lookingForGender}
                  onChange={handleChange}
                  className={`${inputStyle} appearance-none`}>
                  <option value="ANY">Any Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Min Stay (Days)</label>
                <input
                  type="number"
                  name="minStayDuration"
                  value={formData.minStayDuration}
                  onChange={handleChange}
                  placeholder="30"
                  className={inputStyle}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Available From</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Available To</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* Section: Money */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest px-1">
              <IndianRupee size={14} /> Budget
            </h2>
            <input
              type="number"
              name="budgetPerPerson"
              value={formData.budgetPerPerson}
              onChange={handleChange}
              placeholder="Max budget per person"
              required
              className={inputStyle}
            />
          </section>

          {/* Section: Room Details */}
          <section className="space-y-4 pt-4 border-t border-white/5">
            <label className="flex items-center justify-between p-6 bg-[#1c1c1e] rounded-[28px] border border-white/5 cursor-pointer hover:border-white/10 transition-all">
              <div className="flex flex-col">
                <span className="font-bold text-sm">Property Status</span>
                <span className="text-[10px] text-gray-500 uppercase font-black">
                  I already have a room
                </span>
              </div>
              <input
                type="checkbox"
                name="hasRoom"
                checked={formData.hasRoom}
                onChange={handleChange}
                className="w-6 h-6 rounded-full accent-indigo-500"
              />
            </label>

            <AnimatePresence>
              {formData.hasRoom && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4 p-4 bg-indigo-500/5 rounded-[28px] border border-indigo-500/10">
                  <div>
                    <label className={labelStyle}>Total Rent</label>
                    <input
                      type="number"
                      name="totalRoomRent"
                      value={formData.totalRoomRent}
                      onChange={handleChange}
                      placeholder="₹ 40,000"
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Per Person</label>
                    <input
                      type="number"
                      name="rentPerRoommate"
                      value={formData.rentPerRoommate}
                      onChange={handleChange}
                      placeholder="₹ 20,000"
                      className={inputStyle}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Section: About */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest px-1">
              <Info size={14} /> Description
            </h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your lifestyle, work, or room details..."
              className={`${inputStyle} resize-none`}
            />
          </section>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            className="w-full h-16 bg-white text-black font-black text-lg rounded-[24px] shadow-xl shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-50">
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : isEditMode ? (
              "SAVE CHANGES"
            ) : (
              "PUBLISH POST"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
