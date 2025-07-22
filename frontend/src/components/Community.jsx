import React from "react";
import { Link } from "react-router-dom";

const users = [
  {
    name: "Samantha",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    university: "Delhi University",
    course: "BCA",
    tags: ["Early Riser", "Non-Smoker", "Quiet"],
  },
  {
    name: "Raj",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    university: "IIT Bombay",
    course: "M.Tech",
    tags: ["Night Owl", "Music Lover", "Clean"],
  },
  {
    name: "Ananya",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    university: "BITS Pilani",
    course: "MBA",
    tags: ["Vegetarian", "Calm", "Non-Smoker"],
  },
  {
    name: "Aman",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    university: "NIT Trichy",
    course: "B.Tech",
    tags: ["Early Riser", "Gym Lover", "Quiet"],
  },
  {
    name: "Priya",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    university: "JNU",
    course: "M.A.",
    tags: ["Book Lover", "Clean", "Non-Smoker"],
  },
];

export default function Community() {
  return (
    <div className="w-full py-16">
      {/* Heading */}
      <div className="flex justify-between items-center px-6">
        <h2 className="text-3xl font-bold text-white mb-10">
          Meet our <span className="text-blue-600">Community</span>
        </h2>
        <Link to="/allusers">
          <button className="text-sm sm:text-base text-blue-600 hover:underline">
            View All
          </button>
        </Link>
      </div>

      {/* Carousel */}
      <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide mt-10">
        {users.map((user, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[300px] 
            bg-[#000104] rounded-2xl shadow-xl border border-white/10 p-5 
            flex flex-col items-center hover:scale-105 hover:shadow-2xl 
            transition-transform duration-300">
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{user.name}</h3>
            <p className="text-sm text-gray-400">
              {user.university} | {user.course}
            </p>

            <div className="flex gap-2 flex-wrap justify-center mt-3">
              {user.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-600/30 rounded-full text-xs text-blue-200">
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-5 px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
