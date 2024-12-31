import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tabLogo from "../assets/images/tabLogo.png";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div className="fixed-top bg-white shadow-sm">
      {/* Navbar Container */}
      <div className="d-flex justify-content-between align-items-center px-5 py-2">
        {/* Logo Section */}
        <div className="mr-auto">
          <Link to="/" className="text-2xl font-weight-bold">
            <img
              src={tabLogo}
              alt="Logo"
              style={{ width: "75px", height: "75px" }}
            />
          </Link>
        </div>

        {/* Authenticated Navigation Links */}
        {currentUser && (
          <div className="d-flex justify-content-start">
            <Link to="/dashboard" className="text-black mx-2 text-decoration-none">
              Dashboard
            </Link>
            <Link to="/boards" className="text-black mx-2 text-decoration-none">
              Boards
            </Link>
            <Link to="/notes" className="text-black mx-2 text-decoration-none">
              Notes
            </Link>
          </div>
        )}

        {/* Auth Links */}
        <div className="d-flex justify-content-end">
          {currentUser ? (
            <>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
              {error && <p className="text-danger ml-2 mb-0">{error}</p>}
            </>
          ) : (
            <>
              <Link to="/login" className="text-black mx-2 text-decoration-none">
                Login
              </Link>
              <Link to="/signup" className="text-black mx-2 text-decoration-none">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
