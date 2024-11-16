import React from 'react';
import './Newbanner.css'; // Make sure to import the CSS file

const NewBanner = () => {
  return (
    <div className="banner-container">
      <img 
        className="banner-image" 
        src="https://static.vecteezy.com/system/resources/thumbnails/003/240/364/small_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg" 
        alt="Banner" 
      />
    </div>
  );
};

export default NewBanner;
