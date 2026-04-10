import { MenuItem, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Lifestyle = ({ form, setForm, handleChange }) => {
  // Simple handler for Time
  const handleTimeChange = (name, newValue) => {
    setForm((prev) => ({
      ...prev,
      [name]: newValue, // Yahan hum Dayjs object hi save kar rahe hain taaki input lag na kare
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <TimePicker
          label="Sleep Time"
          ampm={true}
          // Agar form.sleepTime string hai to dayjs usey object bana dega,
          // agar pehle se object hai to wahi use hoga.
          value={form.sleepTime ? dayjs(form.sleepTime, "hh:mm A") : null}
          onChange={(val) => handleTimeChange("sleepTime", val)}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
            },
          }}
        />

        <TimePicker
          label="Wake Time"
          ampm={true}
          value={form.wakeTime ? dayjs(form.wakeTime, "hh:mm A") : null}
          onChange={(val) => handleTimeChange("wakeTime", val)}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
            },
          }}
        />
      </div>

      <TextField
        label="Do you smoke?"
        name="smoking"
        value={form.smoking ?? ""}
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
        value={form.drinking ?? ""}
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
        value={form.cleanlinessLevel || ""}
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
        value={form.foodPreference || ""}
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
