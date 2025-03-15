import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { UseAuthstore } from "./lib/UseAuthstore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth,onlineusers } = UseAuthstore();

  console.log(onlineusers)

  useEffect(() => {
    checkAuth(); // Call this when the component loads
  }, [checkAuth]);

  // Show Loader only while authentication is in progress
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
