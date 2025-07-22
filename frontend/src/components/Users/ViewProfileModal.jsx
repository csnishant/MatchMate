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

export default function ViewProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-black">
          ×
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-6 border border-gray-300 rounded-lg p-6 mb-6 shadow">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">
              {user.age} • {user.gender}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left px-2">
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
    </div>
  );
}

// 🔹 Reusable Item Component
function DetailItem({ icon, label, value }) {
  return (
    <>
      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        {icon}
        {label}
      </div>
      <div className="text-gray-800">{value}</div>
    </>
  );
}
