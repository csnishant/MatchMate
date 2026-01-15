import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import {
  LogOut,
  User2,
  Home,
  Users,
  Bell,
  Menu,
  X,
  LayoutGrid,
} from "lucide-react";
import { AUTH_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.get(`${AUTH_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      localStorage.removeItem("user");
      setMobileMenuOpen(false);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    // iOS Style Sticky Blured Header
    <header className="fixed top-0 left-0 w-full z-[100] backdrop-blur-xl bg-black/60 border-b border-white/5 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-5 py-3 md:py-4 flex justify-between items-center">
        {/* Logo - iOS Minimalist Style */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-white">MatchMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
          <NavLink
            to="/"
            icon={<Home size={16} />}
            label="Home"
            active={location.pathname === "/"}
          />
          {/* <NavLink
            to="/all-users"
            icon={<Users size={16} />}
            label="Matches"
            active={location.pathname === "/all-users"}
          /> */}
          <NavLink
            to="/all-posts"
            icon={<LayoutGrid size={16} />}
            label="Feed"
            active={location.pathname === "/all-posts"}
          />
          <NavLink
            to="/notifications"
            icon={<Bell size={16} />}
            label="Alerts"
            active={location.pathname === "/notifications"}
          />
        </nav>

        {/* Right Section: Auth & Profile */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth Buttons */}
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login">
                <button className="text-sm font-semibold text-white/70 hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* 🔔 Mobile Notification Icon */}
              <Link
                to="/notifications"
                className="md:hidden text-white p-2 hover:bg-white/5 rounded-full">
                <Bell size={24} />
              </Link>

              {/* 👤 Profile Avatar + Popover (Mobile + Desktop) */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer">
                    <Avatar className="w-9 h-9 border-2 border-indigo-500/20">
                      <AvatarImage src={user?.profilePic} />
                      <AvatarFallback className="bg-indigo-600 text-white">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-3 bg-[#1c1c1e] text-white rounded-[1.5rem] shadow-2xl border border-white/10 mt-3">
                  <div className="flex items-center gap-3 p-2 border-b border-white/5 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.profilePic} />
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm truncate">{user?.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <PopoverItem
                      to="/profile"
                      icon={<User2 size={16} />}
                      label="View Profile"
                      onClick={() => setOpen(false)}
                    />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-xl">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}

          {/* 🍔 Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* iOS Style Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[60px] left-0 w-full h-screen bg-black/95 backdrop-blur-2xl p-6 md:hidden">
            <div className="flex flex-col gap-6">
              <MobileLink to="/" label="Home" icon={<Home />} />

              <MobileLink
                to="/all-posts"
                label="Explore Posts"
                icon={<LayoutGrid />}
              />
              <MobileLink
                to="/notifications"
                label="Notifications"
                icon={<Bell />}
              />

              {!user ? (
                <div className="flex flex-col gap-3 mt-6">
                  <Link
                    to="/login"
                    className="w-full py-4 text-center text-white border border-white/10 rounded-[1.5rem]">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full py-4 text-center bg-white text-black font-bold rounded-[1.5rem]">
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <MobileLink
                    to="/profile"
                    label="My Profile"
                    icon={<User2 />}
                  />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-red-400 text-xl font-medium px-2">
                    <LogOut size={24} /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// UI Sub-components
const NavLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
      active
        ? "bg-white text-black shadow-lg"
        : "text-white/60 hover:text-white"
    }`}>
    {icon} {label}
  </Link>
);

const PopoverItem = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
    {icon} {label}
  </Link>
);

const MobileLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center gap-4 text-white text-2xl font-bold px-2 group">
    <span className="text-indigo-500 group-hover:scale-110 transition-transform">
      {icon}
    </span>
    {label}
  </Link>
);

export default Navbar;
