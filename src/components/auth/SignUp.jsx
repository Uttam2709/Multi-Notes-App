import React, { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/CustomStyle.css';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate('/login');
    } catch {
      alert('Failed to sign up');
    }
  };

  return (
    <div className="container card mt-5">
      <h2 className="title">Sign Up</h2>
      <p className="description">Welcome to your personal Boards and Note making App</p>
      <form className="form" onSubmit={handleSubmit}>
        <input className="formInput" ref={emailRef} type="email" placeholder="Email" required />
        <input className="formInput" ref={passwordRef} type="password" placeholder="Password" required />
        <button className="btn btn-success" type="submit">Register</button>
        <div className=" mt-2">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </div>
      </form>
    </div>
  );
}
