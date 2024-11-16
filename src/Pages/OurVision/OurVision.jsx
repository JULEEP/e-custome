import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import './OurVision.css';
import vision from '../../Assets/Images/vision.jfif'; // Image import

const OurVision = () => {
  return (
    <Container maxWidth="md" className="our-vision-container">
      <Box className="vision-box">
        
        {/* Left side: Vision text */}
        <Box className="text-content">
        <Typography
        variant="h4"
        style={{
          fontWeight: 'bold',
          color: '#1976d2',
          marginBottom: '20px',
          boxShadow: '6px 20px 20px rgba(0, 0, 0, 0.5)', // Add a blue shadow
        }}
      >
        Our Vision
      </Typography>      
          <Typography variant="body1">
            In line with our vision, we wish to be recognized as an organization renowned for its
            creative solutions, innovation, and quality.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            We also aim to re-calibrate the benchmark standards in designing and printing products
            tailored to meet the needs of a diverse customer base.
          </Typography>
        </Box>

        {/* Right side: Vision image */}
        <Box className="image-content">
          <img src={vision} alt="Our Vision" className="vision-image" />
        </Box>
      </Box>
    </Container>
  );
};

export default OurVision;
