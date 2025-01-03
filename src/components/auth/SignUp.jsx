import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/CustomStyle.css";

export default function SignUp() {
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const contactRef = useRef();
  const genderRef = useRef();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return alert("Passwords do not match!");
    }

    const userDetails = {
      firstName: firstNameRef.current.value,
      contact: contactRef.current.value,
      gender: genderRef.current.value,
    };

    try {
      await signUp(emailRef.current.value, passwordRef.current.value, userDetails);
      alert("Sign-up successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: "80px" }}>
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-success text-center">Sign Up</h2>
        <p className="text-muted text-center">
          Create your personal Diaries & Notes space with Us
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <input
                className="form-control"
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
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
                <option value="" disabled>
                  Select Gender
                </option>
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
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
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
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
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
