import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Fingerprint, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${AUTH_API_END_POINT}/login`, formData, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Welcome Back! 👋");
      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center px-6 py-12">
      {/* iOS Auth Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-10 w-full max-w-md">
        <div className="w-20 h-20 bg-white rounded-[22px] mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          <Fingerprint size={40} className="text-black" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter mb-2">Sign In</h2>
        <p className="text-gray-500 font-medium tracking-tight">
          Welcome back to MatchMate
        </p>
      </motion.div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#1c1c1e] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-1 focus:ring-indigo-500"
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg mt-4 transition-all active:scale-[0.98] disabled:opacity-70"
            disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-bold hover:underline ml-1">
              Sign Up
            </Link>
          </p>

          <div className="h-[1px] w-full bg-white/5" />

          <button className="text-xs text-gray-600 uppercase tracking-widest font-bold hover:text-gray-400 transition-colors">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Security Tag */}
      <p className="mt-12 text-[10px] text-gray-700 uppercase tracking-[0.3em] font-black">
        Secure Access
      </p>
    </div>
  );
};

export default Login;
