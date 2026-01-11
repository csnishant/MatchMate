// src/components/profile/AcademicSection.jsx

import React from "react";
import { TextField } from "@mui/material";

export default function AcademicSection({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* UNIVERSITY */}
      <TextField
        label="University"
        name="university"
        value={form.university}
        onChange={handleChange}
        fullWidth
      />

      {/* COURSE */}
      <TextField
        label="Course"
        name="course"
        value={form.course}
        onChange={handleChange}
        fullWidth
      />

      {/* YEAR */}
      <TextField
        label="Year"
        name="year"
        value={form.year}
        onChange={handleChange}
        fullWidth
      />

      {/* PHONE */}
      <TextField
        label="Phone Number"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        fullWidth
      />

      {/* CITY */}
      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        fullWidth
      />

      {/* STATE */}
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
