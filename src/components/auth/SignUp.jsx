import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const firstNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const contactRef = useRef();
  const genderRef = useRef();
  const { signUp } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setPopupMessage("Passwords do not match!");
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 5000);
      return;
    }

    const userDetails = {
      firstName: firstNameRef.current.value,
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contact: contactRef.current.value,
      gender: genderRef.current.value,
    };

    try {
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        userDetails
      );
      setPopupMessage("Sign-up successful!");
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate("/login");
      });
    } catch (error) {
      setPopupMessage(error.message);
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 10000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-success text-center">Sign Up</h2>
        <p className="text-muted text-center">
          Create your personal Diaries & Notes space with Us
        </p>
        {popupVisible && (
          <div className="popup-notification">{popupMessage}</div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <input
                className="form-control"
                ref={firstNameRef}
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="col-12">
              <input
                className="form-control"
                ref={userNameRef}
                type="text"
                placeholder="User Name"
                required
              />
            </div>
            <div className="col-12">
              <input
                className="form-control"
                ref={emailRef}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="col-12">
              <input
                className="form-control"
                ref={contactRef}
                type="tel"
                placeholder="Contact Number"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div className="col-12">
              <select
                className="form-control"
                ref={genderRef}
                defaultValue=""
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
                className="position-absolute password-toggle-icon"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "👁" : "👀"}
              </span>
            </div>
            <div className="col-12 position-relative">
              <input
                className="form-control"
                ref={confirmPasswordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="position-absolute password-toggle-icon"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "👁" : "👀"}
              </span>
            </div>
          </div>
          <button className="btn btn-success w-100 mt-3" type="submit">
            Register
          </button>
          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-info">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
