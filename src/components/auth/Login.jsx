import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/CustomStyle.css';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };
  //   e.preventDefault();
  //   try {
  //     await login(emailRef.current.value, passwordRef.current.value);
  //     navigate('/dashboard');
  //   } catch {
  //     alert('Failed to log in');
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card col-6 p-4 shadow">
        <h2 className="text-success text-center">Login</h2>
        <p className="text-muted text-center">
          Welcome to your personal Boards and Note making App
        </p>
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="position-absolute"
                style={{
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? '👁' : '👀'}
              </span>
            </div>
          </div>
          <div className="form-check text-center">
            <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
            <Link to="#" className="text-decoration-none text-success ms-3">
              Forgot Password?
            </Link>
          </div>
          <button className="btn btn-success w-100 mt-3" type="submit">
            Login
          </button>
          <div className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/signup" className="text-decoration-none text-info">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
