// FeaturesPage.js
import React from 'react';
import { FaExchangeAlt, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import { Container, Typography, Box } from '@mui/material';
import './Features.css';

const FeaturesPage = () => {
  return (
    <Container maxWidth="md" className="features-container">
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
        Our Services
      </Typography>
      
      <Box className="features-row">
        <Box className="feature">
          <FaExchangeAlt className="feature-icon" />
          <Typography variant="h6" align="center">Easy 30-Day Return Policy</Typography>
        </Box>

        <Box className="feature">
          <FaShippingFast className="feature-icon" />
          <Typography variant="h6" align="center">Express Delivery</Typography>
        </Box>

        <Box className="feature">
          <FaCheckCircle className="feature-icon" />
          <Typography variant="h6" align="center">100% Quality Assured</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default FeaturesPage;
