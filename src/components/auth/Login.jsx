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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch {
      alert('Failed to log in');
    }
  };

  return (
    <div className="container card mt-5">
      <h2 className="text-success text-md-center">Login</h2>
      <p className="text-muted text-md-center">Welcome to your personal Boards and Note making App</p>
      <form className="form p-5" onSubmit={handleSubmit}>
        <input
          className="form-control m-3"
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
        />
        <div className="position-relative m-3">
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
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? "👁" : "👀"}
          </span>
        </div>
        <div className="form-check ms-3 my-2">
          <input className="form-check-input" type="checkbox" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
          <Link to="#" className="text-decoration-none text-success ms-3">Forgot Password?</Link>
        </div>
        <button className="btn btn-success ms-3" type="submit">Login</button>
        <div className="ms-3 mt-2">
          Don't have an account? <Link to="/signup" className="text-decoration-none text-info">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
