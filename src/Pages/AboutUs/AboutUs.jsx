import React from 'react';
import { Typography } from '@mui/material';
import Footer from '../../Components/Footer/Footer';

const AboutUs = () => {
  return (
    <div>
      {/* About Us Heading */}
      <Typography
        variant='h3'
        sx={{
          textAlign: 'center',
          marginTop: 10,
          color: '#1976d2',
          fontWeight: 'bold',
        }}
      >
        About Us
      </Typography>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AboutUs;
