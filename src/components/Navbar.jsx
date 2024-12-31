import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tabLogo from "../assets/images/tabLogo.png";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();
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
    <>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 fixed-top bg-white shadow-sm">
        
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
              <span className="text-primary mx-2 align-self-center">
                {currentUser.displayName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
                style={{ padding: "0.25rem 0.5rem",  }}
              >
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
    </>
  );
};

export default Navbar;
