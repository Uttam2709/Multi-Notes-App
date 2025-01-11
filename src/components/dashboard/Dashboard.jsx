import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BoardManager from "../boards/BoardManager";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      navigate("/auth/login");
    } catch {
      setError("Please try later");
    }
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };


  return (
    <div className="dashboard">
      <div className="dashboard-header d-flex justify-content-between align-items-center">
        <h1 style={{ color: "white" }}>
          {getGreetingMessage()}, {currentUser.userName || currentUser.displayName || "User"}!
        </h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
        {error && <strong className="text-white">{error}</strong>}
      </div>

      <BoardManager userId={currentUser.uid} />
    </div>
  );
};

export default Dashboard;
