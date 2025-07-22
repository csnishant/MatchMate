import React, { useEffect, useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import toast from "react-hot-toast";
import AcademicSection from "./AcademicSection";
import Lifestyle from "./Lifestyle";
import Preferences from "./Preferences";
import Expectations from "./Expectations";
import BasicInfo from "./BasicInfo";

const steps = [
  "Basic Info",
  "Academic",
  "Lifestyle",
  "Preferences",
  "Expectations",
];

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [step, setStep] = useState(0);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    university: "",
    course: "",
    year: "",
    phone: "",
    city: "",
    state: "",
    profilePic: "",
    sleepTime: dayjs(),
    wakeTime: dayjs(),
    smoking: false,
    drinking: false,
    cleanlinessLevel: "",
    foodPreference: "",
    personality: "",
    hobbies: [],
    preferredLanguages: [],
    guestsAllowed: "",
    roommateExpectations: "",
    introvertOrExtrovert: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        ...form,
        ...user,
        sleepTime: user.sleepTime ? dayjs(user.sleepTime, "HH:mm") : dayjs(),
        wakeTime: user.wakeTime ? dayjs(user.wakeTime, "HH:mm") : dayjs(),
      });
      setImage(user.profilePic || null);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleChipToggle = (field, value) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
      else arr.push(value);
      return { ...prev, [field]: arr };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setForm({ ...form, profilePic: url });
    }
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const payload = {
      ...form,
      sleepTime: dayjs(form.sleepTime).format("HH:mm"),
      wakeTime: dayjs(form.wakeTime).format("HH:mm"),
    };
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/:id`,
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-6 py-8">
          
          {/* Stepper with clean iOS-style */}
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#555",
                    },
                  }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <LinearProgress
            variant="determinate"
            value={((step + 1) / steps.length) * 100}
            className="my-5 rounded-full bg-gray-200"
            sx={{ height: 6 }}
          />

          {/* Step Forms */}
          <div className="space-y-6">
            {step === 0 && <BasicInfo form={form} handleChange={handleChange} />}
            {step === 1 && (
              <AcademicSection
                form={form}
                image={image}
                handleImageUpload={handleImageUpload}
                handleChange={handleChange}
              />
            )}
            {step === 2 && <Lifestyle form={form} setForm={setForm} handleChange={handleChange} />}
            {step === 3 && (
              <Preferences form={form} handleChipToggle={handleChipToggle} handleChange={handleChange} />
            )}
            {step === 4 && <Expectations form={form} handleChange={handleChange} handleSubmit={handleSubmit} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-200">
            <Button
              variant="outlined"
              disabled={step === 0}
              onClick={handleBack}
              sx={{ borderRadius: "999px", textTransform: "none", padding: "6px 20px" }}>
              Back
            </Button>
            {step < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ borderRadius: "999px", textTransform: "none", padding: "6px 24px" }}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
