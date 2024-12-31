import React from "react";
import { Link } from "react-router-dom";
import tabLogo from "../assets/images/tabLogo.png";

const Footer = () => {
  return (
    <footer className="bg-light fixed-bottom ">
      <div className="mt-auto pt-3 ">
        <div className="row justify-content-center">
          {/* Logo Section */}
          <div className="col-12 col-md-3 text-center">
            <Link to="/" className="d-block mb-2">
              <img
                src={tabLogo}
                alt="Tab Logo"
                className="img-fluid"
                style={{ maxWidth: "80px", maxHeight: "80px" }}
              />
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

          {/* Contact Info Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com/Uttam2709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-decoration-none"
                >
                  Github
                </a>
              </li>
              <li>Rajkot, Gujarat, 360311</li>
              <li>
                <a
                  href="mailto:uttammarakana03@gmail.com"
                  className="text-black text-decoration-none"
                >
                  uttammarakana03@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91 6353098381"
                  className="text-black text-decoration-none"
                >
                  +91 6353098381
                </a>
              </li>
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
