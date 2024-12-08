import React from 'react';
import './About.css'; // Ensure the CSS file is correctly linked

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="text">
                {/* Remove the button-like "About Us" heading */}
                <h2 className="about-us-heading">About Us</h2>
                <p className="intro-text">
                    At Jaiswal Printers, we are dedicated to delivering exceptional personalized online printing services. Here’s what makes us stand out:
                </p>
                <ul className="about-list">
                    <li>High-quality, accessible printing solutions</li>
                    <li>Empowering businesses and individuals to bring their ideas to life</li>
                    <li>A wide range of printing services tailored to diverse needs</li>
                    <li>Exceptional customer service and reliability</li>
                </ul>
            </div>
            <div className="image">
                <img 
                    src="https://i.pinimg.com/736x/26/de/6e/26de6e1be3b21eab6336c03feb610e11.jpg" 
                    alt="About Us" 
                    className="about-img" 
                />
            </div>
        </div>
    );
};

export default AboutUs;
