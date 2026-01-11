import React from "react";
import { MenuItem, TextField } from "@mui/material";

const BasicInfo = ({ image, handleImageUpload, form, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* PROFILE IMAGE */}
      <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-4">
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-28 w-28 rounded-full object-cover border-2 border-white/10 mb-3"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-white/5 flex items-center justify-center mb-3 text-gray-400 text-sm">
            No Image
          </div>
        )}

        <label className="text-xs font-semibold text-gray-400 mb-2">
          Upload Profile Picture
        </label>

        <label className="cursor-pointer px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 active:scale-95 transition">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* NAME */}
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
      />

      {/* AGE */}
      <TextField
        label="Age"
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        fullWidth
      />

      {/* GENDER */}
      <TextField
        label="Gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
    </div>
  );
};

export default BasicInfo;
