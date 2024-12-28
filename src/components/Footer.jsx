import React from "react";
import { Link } from "react-router-dom";
import tabLogo from "../assets/images/tabLogo.png"; // Make sure the image path is correct

const Footer = () => {
  return (
    <footer className="pt-3">
      <div className="container">
        <div className="row justify-content-center">

          {/* Logo Section */}
          <div className="col-12 col-md-3 text-center ">
            <Link to="/" className="text-2xl font-weight-bold">
              <span className="text-success">
                <img
                  src={tabLogo}
                  alt="Tab Logo"
                  style={{ width: "80px", height: "80px" }}
                />
              </span>
            </Link>
          </div>

          {/* About Us Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5>About Us</h5>
            <p>
              We are a leading provider of innovative solutions. Our mission is
              to deliver quality and exceed expectations.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-black text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-black text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-black text-decoration-none">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-black text-decoration-none">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-black text-decoration-none">
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>Github</li>
              <li>Rajkot, Gujarat, 360311</li>
              <li>uttammarakana03@gmail.com</li>
              <li>+91 6353098381</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top border-secondary pt-3">
          <small>© 2024 Secret Me. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
