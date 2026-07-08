import { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios"; // 👈 Axios import karein
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";

// Components & Pages
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Profile from "./profile/Profile";
import ViewProfile from "./pages/ViewProfile";
import MyPostsPage from "./pages/MyPost";
import Notifications from "./pages/Notifications";
import ExplorePage from "./pages/ExplorePage";
import MyRequests from "./pages/MyRequests";

// Routes Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true); // Loader lagane ke liye

  useEffect(() => {
    const verifyUserSession = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token"); // Agar aap token alag se rakhte hain

      if (!storedUser) {
        setCheckingAuth(false);
        return;
      }

      try {
        // 🚨 APNA ACTUAL BACKEND URL YAHAN DALEIN
        // Yeh route backend par token validate karke user ka fresh data dega
        const response = await axios.get(
          "https://your-backend-url.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Agar backend ne user ko sahi bola, toh dispatch karo
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error("Session expired or invalid token");
        // ❌ Agar backend 401 deta hai, toh fake session clear karo
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(setUser(null));
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUserSession();
  }, [dispatch]);

  // Navbar hide logic
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  // Jab tak token verify ho raha hai, tab tak blank ya loading spinner dikhayein
  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      {!hideNavbar && <Navbar />}

      <main className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          {/* 🌍 Public Route */}
          <Route path="/" element={<Home />} />

          {/* 🚫 Auth Routes (No access after login) */}
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
            path="/my-requests"
            element={
              <ProtectedRoute>
                <MyRequests />
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
