import React from 'react';
import './About.css'; // Optional: Add your CSS file here

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="text">
                {/* Wrap the h2 tag in a div with the 'contact-button' class */}
                <div className="contact-button">
                    <h2>About Us</h2>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis.</p>
            </div>
            <div className="image">
                <img 
                    src="https://th.bing.com/th/id/OIP.mXkx4o4WESGv3BRpUGIdeQHaFj?w=226&h=180&c=7&r=0&o=5&pid=1.7" 
                    alt="About Us GIF" 
                />
            </div>
        </div>
    );
};

export default AboutUs;
