import React, { useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserCircle2, Globe2 } from "lucide-react";
import toast from "react-hot-toast";
import { AUTH_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    countryCode: "+91", // Default Country Code
    contact: "",
    gender: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Combining country code and contact for the final payload
    const finalPayload = {
      ...formData,
      contact: `${formData.countryCode}${formData.contact}`,
    };

    try {
      const res = await axios.post(
        `${AUTH_API_END_POINT}/signup`,
        finalPayload
      );
      toast.success(res.data.message || "Account created!");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup failed";
      setMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center px-6 py-12">
      {/* iOS Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 w-full max-w-md">
        <div className="w-20 h-20 bg-indigo-600 rounded-[22px] mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
          <UserCircle2 size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 font-medium tracking-tight">
          Enter your details to get started
        </p>
      </motion.div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-[#1c1c1e] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/10 rounded-xl h-12"
          />

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/10 rounded-xl h-12"
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/10 rounded-xl h-12"
          />

          {/* --- CONTACT WITH COUNTRY CODE --- */}
          <div className="flex gap-2">
            <div className="relative w-32 shrink-0">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full h-12 pl-8 pr-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-indigo-400 outline-none appearance-none cursor-pointer">
                <option value="+91" className="bg-[#1c1c1e]">
                  +91 (IN)
                </option>
                <option value="+1" className="bg-[#1c1c1e]">
                  +1 (US)
                </option>
                <option value="+44" className="bg-[#1c1c1e]">
                  +44 (UK)
                </option>
                <option value="+971" className="bg-[#1c1c1e]">
                  +971 (UAE)
                </option>
              </select>
              <Globe2
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            <Input
              type="text"
              name="contact"
              placeholder="Phone Number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="flex-grow bg-white/5 border-white/10 rounded-xl h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="h-12 px-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 outline-none">
              <option value="" className="bg-[#1c1c1e]">
                Gender
              </option>
              <option value="Male" className="bg-[#1c1c1e]">
                Male
              </option>
              <option value="Female" className="bg-[#1c1c1e]">
                Female
              </option>
              <option value="Other" className="bg-[#1c1c1e]">
                Other
              </option>
            </select>

            <Input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 rounded-xl h-12"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-white text-black hover:bg-gray-200 rounded-[1.2rem] font-bold text-lg mt-4 transition-all active:scale-[0.98]">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-bold hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
