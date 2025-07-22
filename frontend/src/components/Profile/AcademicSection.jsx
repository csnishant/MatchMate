// src/components/profile/AcademicSection.jsx

import React from "react";
import { TextField } from "@mui/material";

export default function AcademicSection({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* University Field */}
      <TextField
        label="University"
        name="university"
        value={form.university}
        onChange={handleChange}
        fullWidth
      />

      {/* Course Field */}
      <TextField
        label="Course"
        name="course"
        value={form.course}
        onChange={handleChange}
        fullWidth
      />

      {/* Year Field */}
      <TextField
        label="Year"
        name="year"
        value={form.year}
        onChange={handleChange}
        fullWidth
      />

      {/* Phone Number Field */}
      <TextField
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        fullWidth
      />

      {/* City Field */}
      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        fullWidth
      />

      {/* State Field */}
      <TextField
        label="State"
        name="state"
        value={form.state}
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
}
