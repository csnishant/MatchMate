import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  PersonStanding,
  Podcast,
  PoundSterlingIcon,
} from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-slate-100 select-none">
          MatchMate
        </Link>

        {/* Mobile menu button */}
        <button className="text-white md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <Link to="/" className="hover:text-white/80 flex items-center gap-1">
            <Home size={16} /> Home
          </Link>
          <Link
            to="/all-users"
            className="hover:text-white/80 flex items-center gap-1">
            <Users size={16} /> Find Match
          </Link>
          <Link
            to="/notifications"
            className="hover:text-white/80 flex items-center gap-1">
            <Bell size={16} /> Notifications
          </Link>
          <Link
            to="/all-posts"
            className="flex items-center gap-1"
            onClick={() => setMobileMenuOpen(false)}>
            <PoundSterlingIcon size={16} />
            All Posts
          </Link>
          {!user && (
            <div className="flex gap-2">
              <Link to="/login">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu items */}
        {mobileMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white text-black z-40 shadow-md p-4 flex flex-col gap-4 md:hidden">
            <Link
              to="/"
              className="flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}>
              <Home size={16} /> Home
            </Link>
            <Link
              to="/all-posts"
              className="flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}>
              <PoundSterlingIcon size={16} />
              All Posts
            </Link>
            <Link
              to="/all-users"
              className="flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}>
              <Users size={16} /> Find Match
            </Link>
            <Link
              to="/notifications"
              className="flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}>
              <Bell size={16} /> Notifications
            </Link>

            {user ? (
              <div className="flex flex-col gap-2 border-t pt-2">
                <Link
                  to="/profile"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2">
                  <User2 size={16} /> View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t pt-2">
                <Link to="/login">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Avatar (right side for desktop) */}
        {user && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="hidden md:block cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.profilePic} alt="User" />
                  <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-4 bg-white text-black rounded-md shadow-lg border border-gray-200 mt-2 z-50">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={user?.profilePic} alt="User" />
                  <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-base">{user?.name}</h4>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 hover:underline">
                  <User2 size={16} /> View Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:underline text-left">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;
