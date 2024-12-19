import React, { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CustomStyle.css";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch {
      alert("Failed to sign up");
    }
  };

  return (
    <div className="container row col-6 flex text-center  card mt-5">
      <h2 className="title">Sign Up</h2>
      <p className="description">
        Welcome to your personal Boards and Note making App
      </p>
      <form
        className="row flex justify-center align-center"
        onSubmit={handleSubmit}
      >
        <div className="grid">
          <div className="col-8 m-3">
            <input
              class="form-control"
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="col-8 m-3">
            <input
              type="password"
              ref={passwordRef}
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-success col-4" type="submit">
              Register
            </button>
          </div>
          <div className=" mt-2">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
