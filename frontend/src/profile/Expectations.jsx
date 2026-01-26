import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";

const Expectations = ({ form, handleChange, handleSubmit }) => {
  return (
    <div className="space-y-4">
      <TextField
        label="Roommate Expectations"
        name="roommateExpectations"
        value={form.roommateExpectations}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="Are Guests Allowed?"
        name="guestsAllowed"
        value={form.guestsAllowed}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit Profile
      </Button>
    </div>
  );
};

export default Expectations;
