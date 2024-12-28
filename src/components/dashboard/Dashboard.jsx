import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BoardManager from "../Boards/BoardManager";
import "../../assets/styles/CustomStyle.css";

export default function Dashboard() {
  const { logout, currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>; // Show loading if the user data is not available yet
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.displayName || "User"}!</h1> {/* Display the user's name */}
        <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
      </div>
      <BoardManager userId={currentUser.uid} />
    </div>
  );
}
