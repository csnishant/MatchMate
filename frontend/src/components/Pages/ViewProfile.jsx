import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { REQUEST_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import {
  MapPin,
  BookOpen,
  Bed,
  Clock,
  Utensils,
  Sparkles,
  Users,
  Gamepad2,
  Languages,
  Phone,
  Mail,
  Wind,
  Wine,
  Calendar,
  GraduationCap,
  ChevronLeft,
} from "lucide-react";

export default function ViewProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState("none");
  // none | pending | accepted

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/user-profile/${id}`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Profile fetch failed", err);
    }
  };

  /* ================= FETCH REQUEST STATUS ================= */
  const fetchRequestStatus = async () => {
    try {
      const res = await axios.get(`${REQUEST_API_END_POINT}/status/${id}`, {
        withCredentials: true,
      });
      setRequestStatus(res.data.status);
    } catch (err) {
      console.error("Request status error", err);
    }
  };

  /* ================= SEND REQUEST ================= */
  const sendRequest = async () => {
    try {
      await axios.post(
        `${REQUEST_API_END_POINT}/send/${id}`,
        {},
        { withCredentials: true }
      );
      setRequestStatus("pending");
    } catch (err) {
      console.error("Send request failed", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
      await fetchRequestStatus();
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-400 p-6 mt-20 font-bold">
        User Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* TOP BAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-white/10 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1c1c1e] p-8 rounded-[2.5rem] border border-white/10 text-center">
          <img
            src={user.profilePic || "https://avatar.iran.liara.run/public"}
            className="h-32 w-32 rounded-[2.5rem] object-cover mx-auto"
            alt={user.name}
          />

          <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
          <p className="text-indigo-400">
            {user.age} Years • {user.gender}
          </p>

          {/* CONTACT ACTIONS */}
          <div className="flex justify-center gap-3 mt-6">
            <a
              href={`mailto:${user.email}`}
              className="p-3 bg-white/5 rounded-2xl">
              <Mail size={20} />
            </a>

            {/* PHONE ONLY IF ACCEPTED */}
            {requestStatus === "accepted" && (
              <a
                href={`tel:${user.phone}`}
                className="p-3 bg-green-500/20 rounded-2xl">
                <Phone size={20} className="text-green-400" />
              </a>
            )}
          </div>

          {/* REQUEST BUTTON */}
          <div className="mt-6">
            {requestStatus === "none" && (
              <button
                onClick={sendRequest}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-semibold">
                Send Request
              </button>
            )}

            {requestStatus === "pending" && (
              <button
                disabled
                className="w-full py-3 rounded-2xl bg-gray-600 cursor-not-allowed">
                Request Sent
              </button>
            )}

            {requestStatus === "accepted" && (
              <p className="text-green-400 font-semibold">
                Request Accepted — You can call now
              </p>
            )}
          </div>
        </motion.div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-3">
          <InfoCard
            icon={<GraduationCap />}
            label="University"
            value={user.university}
          />
          <InfoCard icon={<BookOpen />} label="Course" value={user.course} />
          <InfoCard
            icon={<MapPin />}
            label="Location"
            value={`${user.city}, ${user.state}`}
          />
          <InfoCard icon={<Calendar />} label="Year" value={user.year} />
        </div>

        {/* LIFESTYLE */}
        <div className="bg-[#1c1c1e] rounded-[2rem] border border-white/5">
          <ListRow icon={<Bed />} label="Sleep Time" value={user.sleepTime} />
          <ListRow icon={<Clock />} label="Wake Time" value={user.wakeTime} />
          <ListRow
            icon={<Utensils />}
            label="Food"
            value={user.foodPreference}
          />
          <ListRow
            icon={<Sparkles />}
            label="Cleanliness"
            value={user.cleanlinessLevel}
          />
          <ListRow
            icon={<Wind />}
            label="Smoking"
            value={user.smoking ? "Yes" : "No"}
          />
          <ListRow
            icon={<Wine />}
            label="Drinking"
            value={user.drinking ? "Yes" : "No"}
            isLast
          />
        </div>

        {/* HOBBIES */}
        <div className="bg-[#1c1c1e] p-6 rounded-[2rem] border border-white/5">
          <h3 className="text-indigo-400 font-bold mb-3 flex gap-2">
            <Gamepad2 /> Hobbies
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.hobbies?.map((h, i) => (
              <span key={i} className="px-4 py-1 bg-white/5 rounded-full">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* EXPECTATION */}
        <div className="bg-indigo-600/10 p-6 rounded-[2rem]">
          <h3 className="flex gap-2 font-bold text-indigo-400">
            <Users /> Roommate Expectations
          </h3>
          <p className="mt-2 italic">
            "{user.roommateExpectations || "Looking for a good roommate"}"
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#1c1c1e] p-4 rounded-3xl border border-white/5">
      <div className="text-indigo-400">{icon}</div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold">{value || "—"}</p>
    </div>
  );
}

function ListRow({ icon, label, value, isLast }) {
  return (
    <div
      className={`flex justify-between p-4 ${
        !isLast ? "border-b border-white/5" : ""
      }`}>
      <div className="flex gap-2 items-center">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-indigo-400 font-semibold">{value || "—"}</span>
    </div>
  );
}
