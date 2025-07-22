import React, { useState } from "react";
import axios from "axios";
import {  USER_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    try {
      const res = await axios.post(`${USER_API_END_POINT}/signup`, formData);
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        contact: "",
        gender: "",
        age: "",
      });
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Create Your MatchMate Account
      </h2>

      {message && (
        <div
          className={`p-2 text-sm rounded ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          autoComplete="name"
          onChange={handleChange}
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <Input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          autoComplete="tel"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-gray-700">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <Input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          Signup
        </Button>
      </form>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
