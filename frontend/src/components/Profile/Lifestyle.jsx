import { MenuItem, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

const Lifestyle = ({ form, setForm, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <TimePicker
          label="Sleep Time"
          value={form.sleepTime}
          onChange={(newValue) => setForm({ ...form, sleepTime: newValue })}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Wake Time"
          value={form.wakeTime}
          onChange={(newValue) => setForm({ ...form, wakeTime: newValue })}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <TextField
        label="Do you smoke?"
        name="smoking"
        value={form.smoking}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value={true}>Yes</MenuItem>
        <MenuItem value={false}>No</MenuItem>
      </TextField>

      <TextField
        label="Do you drink?"
        name="drinking"
        value={form.drinking}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value={true}>Yes</MenuItem>
        <MenuItem value={false}>No</MenuItem>
      </TextField>

      <TextField
        label="Cleanliness Level"
        name="cleanlinessLevel"
        value={form.cleanlinessLevel}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Messy">Messy</MenuItem>
        <MenuItem value="Average">Average</MenuItem>
        <MenuItem value="Very Clean">Very Clean</MenuItem>
      </TextField>
      <TextField
        label="Food Preference"
        name="foodPreference"
        value={form.foodPreference}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Veg">Veg</MenuItem>
        <MenuItem value="Non-Veg">Non-Veg</MenuItem>
        <MenuItem value="Vegan">Vegan</MenuItem>
        <MenuItem value="Eggetarian">Eggetarian</MenuItem>
      </TextField>
    </div>
  );
};

export default Lifestyle;
