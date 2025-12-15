import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
} from "react-icons/fa";

export default function ViewProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      name: "Test User",
      age: 22,
      gender: "Male",
      city: "Indore",
      state: "MP",
      university: "ABC University",
      course: "BTech",
      sleepTime: "11 PM",
      wakeTime: "6 AM",
      foodPreference: "Veg",
      cleanlinessLevel: "High",
      introvertOrExtrovert: "Introvert",
      hobbies: ["Coding", "Music"],
      preferredLanguages: ["Hindi", "English"],
      roommateExpectations: "Clean & friendly",
    });
  }, []);


  if (!user)
    return <div className="text-center text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
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
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          label="Expectations"
          value={user.roommateExpectations || "—"}
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
