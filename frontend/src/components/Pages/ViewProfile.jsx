

// ===============================
// FRONTEND PROFILE PAGE
// File: ViewProfile.jsx
// ===============================

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import {
  FaMapMarkerAlt,
  FaUniversity,
  FaBook,
  FaBed,
  FaClock,
  FaUtensils,
  FaBroom,
  FaUserFriends,
  FaGamepad,
  FaLanguage,
  FaUserAltSlash,
  FaPhone,
  FaEnvelope,
  FaSmoking,
  FaGlassCheers,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ViewProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const [posts, setPosts] = useState([]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/user-profile/${id}`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setPosts(res.data.posts); // ✅ Selected user ke posts
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, [id]);


  if (loading)
    return <div className="text-center text-white p-6">Loading...</div>;
  if (!user)
    return <div className="text-center text-red-400 p-6">User not found</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-300 text-lg">
              {user.age} • {user.gender}
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DetailItem icon={<FaEnvelope />} label="Email" value={user.email} />
        <DetailItem
          icon={<FaPhone />}
          label="Phone"
          value={user.phone || "—"}
        />
        <DetailItem
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={`${user.city || "—"}, ${user.state || ""}`}
        />
        <DetailItem
          icon={<FaUniversity />}
          label="University"
          value={user.university || "—"}
        />
        <DetailItem
          icon={<FaBook />}
          label="Course"
          value={user.course || "—"}
        />
        <DetailItem
          icon={<FaCalendarAlt />}
          label="Year"
          value={user.year || "—"}
        />
        <DetailItem
          icon={<FaBed />}
          label="Sleep Time"
          value={user.sleepTime || "—"}
        />
        <DetailItem
          icon={<FaClock />}
          label="Wake Time"
          value={user.wakeTime || "—"}
        />
        <DetailItem
          icon={<FaUtensils />}
          label="Food Preference"
          value={user.foodPreference || "—"}
        />
        <DetailItem
          icon={<FaBroom />}
          label="Cleanliness"
          value={user.cleanlinessLevel || "—"}
        />
        <DetailItem
          icon={<FaSmoking />}
          label="Smoking"
          value={user.smoking ? "Yes" : "No"}
        />
        <DetailItem
          icon={<FaGlassCheers />}
          label="Drinking"
          value={user.drinking ? "Yes" : "No"}
        />
        <DetailItem
          icon={<FaUserAltSlash />}
          label="Personality"
          value={user.introvertOrExtrovert || "—"}
        />
        <DetailItem
          icon={<FaGamepad />}
          label="Hobbies"
          value={user.hobbies?.join(", ") || "—"}
        />
        <DetailItem
          icon={<FaLanguage />}
          label="Languages"
          value={user.preferredLanguages?.join(", ") || "—"}
        />
        <DetailItem
          icon={<FaUserFriends />}
          label="Roommate Expectations"
          value={user.roommateExpectations || "—"}
        />
        <DetailItem
          icon={<FaCalendarAlt />}
          label="Joined On"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
      <div className="flex items-center gap-3 text-purple-300 text-lg font-semibold mb-2">
        {icon}
        {label}
      </div>
      <p className="text-gray-200 text-md">{value}</p>
    </div>
  );
}
