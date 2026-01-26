import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// Sections
import BasicInfo from "./BasicInfo";
import AcademicSection from "./AcademicSection";
import Lifestyle from "./Lifestyle";
import Preferences from "./Preferences";
import Expectations from "./Expectations";

const steps = ["Basic", "Academic", "Lifestyle", "Preferences", "Expectations"];

// 🌙 GLOBAL DARK THEME FOR MUI
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
      paper: "#1c1c1e",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "18px",
          backgroundColor: "#1c1c1e",
        },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.1)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9ca3af",
        },
      },
    },
  },
});

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
    city: "",
    phone: "",
    profilePic: "",
    sleepTime: dayjs(),
    wakeTime: dayjs(),
    smoking: false,
    drinking: false,
    foodPreference: "",
    personality: "",
    hobbies: [],
    preferredLanguages: [],
    roommateExpectations: "",
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
  }, [user]);

  const handleNext = () => step < steps.length - 1 && setStep(step + 1);
  const handleBack = () => step > 0 && setStep(step - 1);

  const handleChange = (e) => {
    if (!e || !e.target) return; // 🔥 prevents crash

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChipToggle = (field, value) => {
    setForm((prev) => {
      const currentArray = prev[field] || [];

      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const payload = {
        ...form,
        sleepTime: dayjs(form.sleepTime).format("HH:mm"),
        wakeTime: dayjs(form.wakeTime).format("HH:mm"),
      };

      const res = await axios.put(
        `${USER_API_END_POINT}/profile/${user._id}`,
        payload,
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile Updated ✨");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* ❌ text-white removed */}
        <div className="min-h-screen bg-black p-4 md:p-8">
          <div className="max-w-2xl mx-auto flex flex-col min-h-[90vh]">
            {/* HEADER */}
            <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md pt-4 pb-6">
              <div className="flex items-center justify-between mb-6 px-2">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`p-2 rounded-full ${
                    step === 0 ? "opacity-0" : "bg-white/5 hover:bg-white/10"
                  }`}>
                  <ChevronLeft className="text-white" />
                </button>

                <div className="text-center">
                  <h1 className="text-white text-xl font-bold">
                    {steps[step]}
                  </h1>
                  <p className="text-[10px] text-gray-400 uppercase">
                    Step {step + 1} of 5
                  </p>
                </div>

                <div className="w-10" />
              </div>
            </header>

            {/* FORM */}
            <main className="flex-grow mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-[#1c1c1e] rounded-[2.5rem] p-6 md:p-8 border border-white/5 shadow-2xl">
                  {step === 0 && (
                    <BasicInfo form={form} handleChange={handleChange} />
                  )}
                  {step === 1 && (
                    <AcademicSection form={form} handleChange={handleChange} />
                  )}
                  {step === 2 && (
                    <Lifestyle form={form} handleChange={handleChange} />
                  )}
                  {step === 3 && (
                    <Preferences
                      form={form}
                      handleChange={handleChange}
                      handleChipToggle={handleChipToggle}
                    />
                  )}
                  {step === 4 && (
                    <Expectations form={form} handleChange={handleChange} />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* FOOTER */}
            <footer className="sticky bottom-0 bg-black/80 backdrop-blur-md py-6 px-2 mt-8">
              {step < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-full bg-white text-black h-14 rounded-2xl font-bold text-lg">
                  Continue <ChevronRight className="inline ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 text-white h-14 rounded-2xl font-bold text-lg">
                  Complete Profile <Check className="inline ml-2" />
                </button>
              )}
            </footer>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
