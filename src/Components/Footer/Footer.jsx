import React from "react";
import { BsCheckCircle, BsTruck, BsArrowRepeat, BsFacebook, BsInstagram, BsTwitter, BsYoutube, BsFillTelephoneInboundFill, BsFillEnvelopeFill, BsWhatsapp } from "react-icons/bs"; // Import icons from react-icons
import './footer.css'; // Import the updated CSS file
import mastroV1 from '../../Assets/Images/mastro-v1.svg'
import bhimUpiV1 from '../../Assets/Images/bhim-upi-v1.svg';
import paytmV1 from '../../Assets/Images/paytm-v1.svg';
import gpayV1 from '../../Assets/Images/gpay-v1.svg';
import phonePeyV1 from '../../Assets/Images/phone-pey-v1.svg';
const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="container-xxl">
          {/* Footer content with the benefits */}
          <div className="footer-content">
            <div className="footer-item">
              <BsCheckCircle className="footer-icon" />
              <p>Premium Quality Assured</p>
            </div>
            <div className="footer-divider" />
            <div className="footer-item">
              <BsTruck className="footer-icon" />
              <p>Free And Fast Delivery</p>
            </div>
            <div className="footer-divider" />
            <div className="footer-item">
              <BsArrowRepeat className="footer-icon" />
              <p>30 DAYS RETURN POLICY</p>
            </div>
          </div>
          
          {/* Add the footer line after the return policy */}
          <div className="footer-line" />
          
          {/* Footer sections: Follow Us and SUPPORT */}
          <div className="footer-bottom">
            {/* Follow Us Section */}
            <div className="follow-us">
              <p>FOLLOW US</p>
              <div className="social-icons">
                <div className="social-item">
                  <BsFacebook className="social-icon" />
                </div>
                <div className="social-item">
                  <BsInstagram className="social-icon" />
                </div>
                <div className="social-item">
                  <BsTwitter className="social-icon" />
                </div>
                <div className="social-item">
                  <BsYoutube className="social-icon" />
                </div>
              </div>
            </div>
            <div className="footer-divider1" />
            {/* SUPPORT Section */}
            <div className="support-section">
              <p>SUPPORT</p>
              <div className="support-icons">
                <div className="support-item">
                  <BsFillTelephoneInboundFill className="support-icon" />
                </div>
                <div className="support-item">
                  <BsFillEnvelopeFill className="support-icon" />
                </div>
                <div className="support-item">
                  <BsWhatsapp className="support-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Add footer line before the payment section */}
          <div className="footer-line" />

          {/* 100% SECURE PAYMENTS Section */}
<div className="secure-payments">
<p>100% SECURE PAYMENTS</p>
<div className="payment-icons">
  <img src={mastroV1} alt="Mastro Payment" className="payment-icon" />
  <img src={bhimUpiV1} alt="BHIM UPI Payment" className="payment-icon" />
  <img src={gpayV1} alt="Gpay UPI Payment" className="payment-icon" />
  <img src={phonePeyV1} alt="Phone Pay Payment" className="payment-icon" />
</div>
</div>
          <div className="footer-line" />

          {/* Add footer section with links organized into columns */}
          <div className="footer-links">
            <div className="footer-link-column">
            <p style={{ color: '#1976d2', fontWeight: 'bold' }}>COMPANY</p>
            <ul>
            <li onClick={() => window.location.href = '/aboutUs'} style={{ cursor: 'pointer' }}>About Us</li>
            <li>Privacy Policy</li>
                <li>T&C's</li>
                <li>Refer & Earn</li>
              </ul>
            </div>
            <div className="footer-link-column">
              <p style={{ color: '#1976d2', fontWeight: 'bold' }}>BEST SELLERS</p>
              <ul>
                <li>Wall Photo Frames</li>
                <li>Photo Stands</li>
                <li>Mobile Cases</li>
                <li>Photo Mugs</li>
              </ul>
            </div>
            <div className="footer-link-column">
              <p style={{ color: '#1976d2', fontWeight: 'bold' }}>SUPPORT</p>
              <ul>
                <li onClick={() => window.location.href = '/contactUs'} style={{ cursor: 'pointer' }}>Contact Us</li>
                <li>Track Order</li>
                <li>Return Order</li>
                <li>FAQ's</li>
              </ul>
            </div>
            <div className="footer-link-column">
              <p style={{ color: '#1976d2', fontWeight: 'bold' }}>MORE INFO</p>
              <ul>
                <li onClick={() => window.location.href = '/login'} style={{ cursor: 'pointer' }}>My Account</li>
                <li>Order History</li>
                <li>Your Credits</li>
              </ul>
            </div>
          </div>

          <div className="footer-line" />
         {/* Copyright Section */}
         <div className="footer-copyright">
         <p>Copyright 2024. All rights reserved by jaiswaloffset@gmail.com</p>
       </div>
     </div>
   </footer>
    </>
  );
};

export default Footer;
