import React from 'react';
import { Container } from '@mui/material';
import Slider from 'react-slick';

const ImageCarousel = () => {
  const images = [
    "https://printo-s3.dietpixels.net/site/2024/Engagement%20kits%202025/C&D_HP%20Banner%20Desktop_1731181704_1733832253.png?quality=70&format=webp&w=1920",
    "https://printo-s3.dietpixels.net/site/2024/Engagement%20kits%202025/Dek_1733832246.png?quality=70&format=webp&w=1920",
  ];

  // Carousel settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // One slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Duration for each slide in ms
    arrows: false, // Hide navigation arrows
  };

  return (
    <Container maxWidth="xl" style={{ padding: '0', marginTop: '20px' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ outline: 'none' }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default ImageCarousel;
