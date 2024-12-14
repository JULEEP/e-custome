import React from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const BandOfTrust = () => {
  const features = [
    { icon: <LocalMallIcon style={{ fontSize: 60, color: '#87cefa' }} />, label: 'Great Selection' },
    { icon: <MonetizationOnIcon style={{ fontSize: 60, color: '#87cefa' }} />, label: 'Low Price' },
    { icon: <LocalShippingIcon style={{ fontSize: 60, color: '#87cefa' }} />, label: 'Speedy Delivery' },
  ];

  return (
    <Container
      maxWidth="lg"
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 8px 20px rgba(0, 0, 255, 0.2)',
      }}
    >
      {/* Heading */}
      <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
        Band Of Trust
      </Typography>

      {/* Features Section */}
      <Grid container alignItems="center" justifyContent="space-between">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              {/* Icon */}
              {feature.icon}
              {/* Feature Label */}
              <Typography
                variant="h6"
                style={{
                  marginTop: '10px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {feature.label}
              </Typography>
            </Grid>
            {/* Divider */}
            {index < features.length - 1 && (
              <Grid item>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{
                    height: '80px',
                    backgroundColor: '#d4e157',
                  }}
                />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default BandOfTrust;
