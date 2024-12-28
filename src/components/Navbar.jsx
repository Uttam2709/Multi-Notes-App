import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tabLogo from '../assets/images/tabLogo.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error('Failed to log out');
    }
  };

  return (
    <nav className=" text-black">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="mr-auto">
          <Link to="/" className="text-2xl font-weight-bold">
            <img src={tabLogo} alt="Logo" style={{ width: "75px", height: "75px" }} />
          </Link>
        </div>

        {/* Main Navigation Links */}
        <div className="d-flex justify-content-start">
          <Link to="/home" className="text-black mx-2 text-decoration-none">
            Home
          </Link>
          <Link to="/about" className="text-black mx-2 text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="text-black mx-2 text-decoration-none">
            Contact
          </Link>
          {currentUser && (
            <>
              <Link to="/dashboard" className="text-black mx-2 text-decoration-none">
                Dashboard
              </Link>
              <Link to="/boards" className="text-black mx-2 text-decoration-none">
                Boards
              </Link>
              <Link to="/notes" className="text-black mx-2 text-decoration-none">
                Notes
              </Link>
            </>
          )}
        </div>

        {/* Auth Links */}
        <div className="d-flex justify-content-end">
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Logout
            </button>
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
    </nav>
  );
};

export default Navbar;
