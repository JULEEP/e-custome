import React from 'react';
import './contact.css'; // Ensure the CSS file is imported

const ContactUs = () => {
  return (
    <div className="contact-us">
      {/* Image Section with Overlay */}
      <div className="image">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/006/801/832/non_2x/get-in-touch-illustration-exclusive-design-inspiration-vector.jpg" 
          alt="Contact Us"
        />
        <div className="overlay">
          <h2>Get in Touch</h2>
          <ul>
            <li><i className="fas fa-envelope"></i> <a href="mailto:jaiswaloffset@gmail.com">jaiswaloffset@gmail.com</a></li>
            <li><i className="fas fa-phone"></i> Office Phone: 07692-224203</li>
            <li><i className="fas fa-mobile-alt"></i> Mob: 9827274100, 9425174803</li>
            <li><i className="fas fa-globe"></i> <a href="http://jaiswaloffset.com" target="_blank" rel="noopener noreferrer">jaiswaloffset.com</a></li>
            <li><i className="fas fa-headset"></i> Customer Care: 9827274100</li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-section">
        <form>
          <h3>Contact Form</h3>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
