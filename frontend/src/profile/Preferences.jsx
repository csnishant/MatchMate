import { Chip, MenuItem, TextField } from "@mui/material";
import React from "react";

const Preferences = ({ form, handleChipToggle, handleChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Your Hobbies</label>
        {["Gaming", "Music", "Reading", "Cooking", "Gym"].map((item) => (
          <Chip
            key={item}
            label={item}
            onClick={() => handleChipToggle("hobbies", item)}
            color={form.hobbies.includes(item) ? "primary" : "default"}
            className="m-1"
          />
        ))}
      </div>

      <div>
        <label className="block mb-1">Preferred Languages</label>
        {["Hindi", "English", "Marathi", "Gujarati"].map((lang) => (
          <Chip
            key={lang}
            label={lang}
            onClick={() => handleChipToggle("preferredLanguages", lang)} // ✅
            color={
              form.preferredLanguages.includes(lang) ? "primary" : "default"
            }
            className="m-1"
          />
        ))}
      </div>

      <TextField
        label="Personality"
        name="Personality"
        value={form.Personality}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Introvert">Introvert</MenuItem>
        <MenuItem value="Extrovert">Extrovert</MenuItem>
        <MenuItem value="Ambivert">Ambivert</MenuItem>
      </TextField>
    </div>
  );
};

export default Preferences;
