import React from 'react';
import HomePageBanner from '../Assets/Images/HomePageBanner.webp';
import './Banner.css'; // Optional: import CSS for styling if needed

const Banner = () => {
  return (
    <div className="banner-container">
      <img src={HomePageBanner} alt="Home Page Banner" className="banner-image" />
    </div>
  );
};

export default Banner;
