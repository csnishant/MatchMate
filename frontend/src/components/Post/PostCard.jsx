import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Wallet, User, Percent } from "lucide-react";

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  if (!post || !post.user) return null;

  return (
    <div
      className={`bg-black text-white rounded-3xl shadow-lg transition p-5 flex flex-col gap-4 ${
        expanded
          ? "max-w-4xl mx-auto"
          : "md:w-[450px] h-[200px] flex-row items-center"
      }`}>
      {/* USER IMAGE */}
      <img
        src={post.user?.profilePic || "https://i.pravatar.cc/100"}
        alt="User"
        className={`rounded-full object-cover ${
          expanded ? "w-24 h-24 mx-auto" : "w-20 h-20"
        }`}
      />

      {/* DETAILS */}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="text-xl font-semibold">{post.user.name}</div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <MapPin size={14} />
          {post.city}, {post.area}
        </div>

        {/* Compact info */}
        {!expanded && (
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
              <Wallet size={12} /> ₹{post.budgetPerPerson}
            </div>
            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              <User size={12} /> {post.lookingForGender}
            </div>
            <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
              <Percent size={12} /> Match: {post.matchPercentage || 85}%
            </div>
          </div>
        )}

        {/* Expanded info */}
        {expanded && (
          <div className="mt-2 text-sm text-gray-200 flex flex-col gap-2">
            <p>💰 Budget per Person: ₹{post.budgetPerPerson}</p>
            <p>📅 From: {new Date(post.fromDate).toDateString()}</p>
            <p>📅 To: {new Date(post.toDate).toDateString()}</p>
            <p>⏳ Minimum Stay: {post.minStayDuration} months</p>
            <p>👤 Looking For: {post.lookingForGender}</p>
            {post.hasRoom && (
              <>
                <p>🏠 Room Description: {post.roomDescription}</p>
                <p>Total Rent: ₹{post.totalRoomRent}</p>
                <p>Rent Per Roommate: ₹{post.rentPerRoommate}</p>
              </>
            )}
            <p>📝 Additional Notes: {post.description}</p>
            {post.roomImages?.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {post.roomImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Room"
                    className="h-24 rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
        <Link
          to={`/user-profile/${post.user._id}`}
          className="text-indigo-400 text-sm hover:underline">
          View
        </Link>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 text-xs">
          Chat
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-purple-400 hover:underline text-xs mt-1">
          {expanded ? "Show Less" : "View Full Post"}
        </button>
      </div>
    </div>
  );
}
