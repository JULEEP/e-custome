import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import './footer.css';  // Import the CSS file

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-xxl">
          <div className="row justify-between">
            <div className="col-md-5">
              {/* You can add content here if needed */}
            </div>
            <div className="col-md-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                />
                <span className="input-group-text">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer>
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-4">
              <h4>Contact Us</h4>
              <address>
                This is address <br />
                <br />

              </address>
              <div className="social_icons">
                <a href="#">
                  <BsLinkedin />
                </a>
                <a href="#">
                  <BsInstagram />
                </a>
                <a href="#">
                  <BsGithub />
                </a>
                <a href="#">
                  <BsYoutube />
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <h4>Information</h4>
              <div className="footer-link">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/refund-policy">Refund Policy</Link>
                <Link to="/shipping-policy">Shipping Policy</Link>
                <Link to="/term-conditions">Terms & Conditions</Link>
                <Link>Blogs</Link>
              </div>
            </div>

            <div className="col-md-3">
              <h4>Account</h4>
              <div className="footer-link">
                <Link to="/aboutUs">About Us</Link>
                <Link>FAQ</Link>
                <Link to="/contactUs">Contact</Link>
              </div>
            </div>

            <div className="col-md-2">
              <h4>Quick Links</h4>
              <div className="footer-link">
                <Link>Cloths</Link>
                <Link>Cards</Link>
                <Link>ABC</Link>
                <Link>Bags</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer-bottom">
        <div className="container-xxl">
          <p>
            &copy; {new Date().getFullYear()} Powered by JaiswalOffset
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
