import React from 'react';
import './contact.css'; // Make sure the CSS file is imported

const ContactUs = () => {
  return (
    <div className="about-us">
      <div className="text">
        {/* Added a wrapper div for the h2 */}
        <div className="contact-button">
          <h2>Contact Us</h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis.</p>
      </div>
      <div className="image">
        <img 
          src="https://th.bing.com/th/id/R.bdf91335ae0f65168c403ae4f2483e29?rik=o3vp6WHduy8kwg&riu=http%3a%2f%2fsilvertech.in%2fimage%2fcontact-us-figure.png&ehk=qIhuzUu%2f8ud5ynO4hpe%2fS75J7VCwTAIzBSHdUY9I%2fsc%3d&risl=&pid=ImgRaw&r=0" 
          alt="Contact Us" 
        />
      </div>
    </div>
  );
};

export default ContactUs;
