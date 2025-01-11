import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setPopupMessage("Login successful!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      });
    } catch (error) {
      setPopupMessage("Failed to log in: " + error.message);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card col-lg-4 col-md-6 col-10 p-4 shadow">
        <h2 className="text-success text-center">Login</h2>
        <p className="text-muted text-center">Your personal space awaits</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <input
                className="form-control"
                ref={emailRef}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="col-12 position-relative">
              <input
                className="form-control"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="position-absolute"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "👁" : "👀"}
              </span>
            </div>
          </div>
          <div className="form-check text-center mt-2">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
            <Link to="#" className="text-decoration-none text-success ms-3">
              Forgot Password?
            </Link>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 mt-3" type="submit">
              Login
            </button>
          </div>
          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-info">
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      {showPopup && (
        <div
          className="popup-message"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
}
