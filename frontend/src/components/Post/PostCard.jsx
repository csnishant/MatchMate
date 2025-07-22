import { Link } from "react-router-dom";
import { MapPin, Wallet, User, Percent } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <div
      className="bg-black text-white rounded-3xl shadow-lg hover:shadow-2xl transition 
      p-5 flex items-center gap-4 md:w-[450px] h-[200px]">
      {/* Left Image */}
      <img
        src={post.user?.profileImage || "https://i.pravatar.cc/100"}
        alt="User"
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Right Details */}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="text-xl font-semibold">{post.user?.name}</div>

        <div className="flex items-center gap-1 text-sm text-gray-300">
          <MapPin size={14} />
          {post.city}, {post.area}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            <Wallet size={12} />₹{post.budgetPerPerson}
          </div>
          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            <User size={12} />
            {post.lookingForGender}
          </div>
          <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
            <Percent size={12} />
            Match: {post.matchPercentage || 85}%
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-end gap-2">
        <Link
          to={`/view-post/${post._id}`}
          className="text-indigo-400 text-sm hover:underline">
          View
        </Link>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 text-xs">
          Chat
        </button>
      </div>
    </div>
  );
}
