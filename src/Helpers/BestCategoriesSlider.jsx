import React from 'react';
import Slider from 'react-slick';
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Hoarding, Flier, Acrylic, Canvas, Bank, Bill, Cards } from '../Assets/Images/Image'; // Import images

// Best categories data
const bestCategories = [
  {
    img: Hoarding,
    name: "Hoardings",
    slug: "hoardings",
  },
  {
    img: Flier,
    name: "Fliers",
    slug: "fliers",
  },
  {
    img: Canvas,
    name: "Canvas Printing",
    slug: "canvas-printing",
  },
  {
    img: Acrylic,
    name: "Acrylic Printing",
    slug: "acrylic-printing",
  },
  {
    img: Bank,
    name: "Banks",
    slug: "banks",
  },
  {
    img: Bill,
    name: "Bill Books",
    slug: "bill-books",
  },
  {
    img: Cards,
    name: "Cards",
    slug: "cards",
  },
];

const BestCategoriesSlider = () => {
  // Slick settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the slider
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed (3 seconds per slide)
    slidesToShow: 4, // Increased number of slides to show at once
    slidesToScroll: 1,
    arrows: false, // Disable previous and next arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px', textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          color: '#1976d2',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: '20px',
        }}
      >
        Best Categories
      </Typography>

      <Slider {...settings}>
        {bestCategories.map((category) => (
          <Box key={category.name} style={{ padding: '15px' }}>
            <Link to={`/category/${category.slug}`} style={{ textDecoration: 'none' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  style={{
                    width: '150px', // Increased size of the image
                    height: '150px', // Increased height of the image
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '10px',
                  }}
                />
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  {category.name}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default BestCategoriesSlider;
