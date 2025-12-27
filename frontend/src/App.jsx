import { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
// App.jsx
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/auth/Signup.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import Profile from "./components/Profile/Profile";

import Notifications from "./components/Users/Notification";

import ExplorePage from "./components/Pages/ExplorePage";
import ViewProfile from "./components/Pages/ViewProfile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  });

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/all-posts" element={<ExplorePage />} />
        <Route path="/user-profile/:id" element={<ViewProfile />} />
      </Routes>
    </>
  );
}

export default App;
