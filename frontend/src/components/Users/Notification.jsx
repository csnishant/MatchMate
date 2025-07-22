import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Request_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";

const Notifications = () => {
  const [requests, setRequests] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${Request_API_END_POINT}/received`, {
        withCredentials: true,
      });
      setRequests(res.data.requests);
    } catch (err) {
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleResponse = async (id, status) => {
    try {
      await axios.put(
        `${Request_API_END_POINT}/update/${id}`,
        { status },
        { withCredentials: true }
      );a
      toast.success(`Request ${status}`);
      fetchNotifications();
    } catch {
      toast.error("Failed to update request");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400">
      <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>

      {requests.length === 0 ? (
        <p className="text-white/80">No requests yet</p>
      ) : (
        requests.map(({ _id, sender }) => (
          <div
            key={_id}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-4 shadow-xl transition-all hover:shadow-2xl hover:bg-white/20">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Sender Info */}
              <div className="flex items-center gap-4">
                <img
                  src={sender.profilePic || "/default.jpg"}
                  alt={sender.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
                <div className="text-white">
                  <p className="font-semibold text-base">{sender.name}</p>
                  <p className="text-sm text-white/70">
                    {sender.gender}, {sender.age}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => handleResponse(_id, "accepted")}
                  className="px-4 py-1.5 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(_id, "rejected")}
                  className="px-4 py-1.5 text-sm rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
