import React, { useState } from "react";

import axios from "axios";
import { POST_API_END_POINT } from "@/utils/constant";

export default function PostForm({ close }) {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${POST_API_END_POINT}/create`, formData, {
        withCredentials: true,
      });

      alert("Post Created Successfully!");
      close();
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Something went wrong while posting"
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <input
        name="lookingForGender"
        placeholder="Looking for (e.g., Male/Female/Any)"
        value={formData.lookingForGender}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="minStayDuration"
          placeholder="Min Stay (days)"
          value={formData.minStayDuration}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="budgetPerPerson"
          placeholder="Budget per person"
          value={formData.budgetPerPerson}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasRoom"
            checked={formData.hasRoom}
            onChange={handleChange}
          />
          Already have a room?
        </label>
      </div>

      {formData.hasRoom && (
        <div className="space-y-2">
          <input
            type="text"
            name="roomImages"
            placeholder="Room Image URL"
            value={formData.roomImages}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            name="totalRoomRent"
            placeholder="Total Room Rent"
            value={formData.totalRoomRent}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            name="rentPerRoommate"
            placeholder="Rent per Roommate"
            value={formData.rentPerRoommate}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            name="roomDescription"
            placeholder="Room Description"
            value={formData.roomDescription}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      )}

      <textarea
        name="description"
        placeholder="Any additional info"
        value={formData.description}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
