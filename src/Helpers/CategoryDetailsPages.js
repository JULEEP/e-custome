import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// URL for the background image
const backgroundImageUrl = "https://img.freepik.com/premium-vector/illustration-vector-calendar-flat-design_485656-132.jpg";

// Data: Subcategories
const subcategories = [
  "Large Hoardings",
  "Street Hoardings",
  "LED Hoardings",
  "Event Fliers",
  "Business Fliers",
  "Promotional Fliers",
  "Photo Canvas",
  "Artwork Canvas",
  "Customized Canvas",
  "Acrylic Signs",
  "Acrylic Panels",
  "3D Acrylic Prints",
  "Bank Branch Banners",
  "ATM Stickers",
  "Promotional Bank Flyers",
  "Customized Bill Books",
  "Carbonless Bill Books",
  "Multi-Page Bill Books",
  "Business Cards",
  "Greeting Cards",
  "Loyalty Cards",
];

const CategoryDetailsPages = () => {
  // Carousel settings
  const settings = {
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 5, // Show 5 items at a time
    slidesToScroll: 1, // Scroll one item at a time
    autoplay: true, // Enable auto-sliding
    autoplaySpeed: 3000, // Speed between slides
    arrows: false, // Disable next/prev arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }, // 3 items on smaller screens
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 }, // 2 items on even smaller screens
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }, // 1 item for very small screens
      },
    ],
  };

  return (
    <Container maxWidth="xl" style={{ padding: '20px', backgroundColor: '#d6c2a1' }}>
      {/* Slider to loop through subcategories */}
      <Slider {...settings}>
        {subcategories.map((subcategory) => (
          <Box
            key={subcategory}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '250px', // Max width to keep it consistent
            }}
          >
            {/* Display the image as background */}
            <Box
              style={{
                width: '150px',
                height: '150px',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                marginBottom: '10px', // Spacing between image and name
              }}
            ></Box>

            {/* Display subcategory name below the image */}
            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>
              {subcategory}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default CategoryDetailsPages;
