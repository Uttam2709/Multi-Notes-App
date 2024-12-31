import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BoardManager from "../boards/BoardManager";
import "../../assets/styles/CustomStyle.css";

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!currentUser) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard container py-2" style={{ marginTop: "80px" }}>
      {/* Header Section */}
      <div className="dashboard-header d-flex justify-content-between align-items-center mt-5">
        <h1 style={{color: 'white'}}>
          {getGreetingMessage()}, {currentUser.displayName || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      {/* Board Manager Section */}
      <div className="board-manager">
        <BoardManager userId={currentUser.uid} />
      </div>
    </div>
  );
};

export default Dashboard;
