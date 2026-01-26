import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./profile/Profile";
import Notifications from "./pages/Notification";
import ExplorePage from "./pages/ExplorePage";
import ViewProfile from "./pages/ViewProfile";
import MyPostsPage from "./pages/MyPost";
import CreatePostPage from "./pages/CreatePost";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // 🔥 Navbar hide logic
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      {!hideNavbar && <Navbar />}

      <main className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          {/* 🌍 Public Route */}
          <Route path="/" element={<Home />} />

          {/* 🚫 Auth Routes (no navbar + no access after login) */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />

          {/* 🔐 Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-posts"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-post"
            element={
              <ProtectedRoute>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post/:id"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile/:id"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
