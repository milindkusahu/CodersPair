import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

import ProtectedLayout from "../components/ProtectedLayout";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LandingPage from "../components/LandingPage";
import PublicLayout from "../components/PublicLayout";

function AppRoutes() {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);

  // Global auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`);
        dispatch(addUser(res.data));
      } catch {
        console.log("Not logged in");
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="theme" element={<ThemeSwitcher />} />
      </Route>

      {/* Protected routes */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="feed" element={<Feed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="connections" element={<Connections />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
