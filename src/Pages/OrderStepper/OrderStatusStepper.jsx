import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';

// Define the specific order statuses
const statuses = [
  "Draft",
  "Payment Pending",
  "Payment Confirmed",
  "Order Confirmed",
  "Print Ready",
  "Shipped"
];

const OrderStatusStepper = () => {
  // Static order status for simulation
  const orderStatus = "Shipped";  // The current order status (for example, it's "Shipped")
  const orderStatusHistory = [
    "Draft", "Payment Pending", "Payment Confirmed", "Order Confirmed", "Print Ready"
  ];  // History of statuses that have been completed

  // Active Step is the current status step
  const activeStep = statuses.indexOf(orderStatus);

  // Use Material-UI's useTheme and useMediaQuery to handle responsive design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  // True if the screen width is <= 600px

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        orientation={isSmallScreen ? "vertical" : "horizontal"}  // Change orientation based on screen size
      >
        {statuses.map((status, index) => {
          const isCompleted = orderStatusHistory.includes(status);
          const isActive = orderStatus === status;
          return (
            <Step key={index}>
              <StepLabel
                sx={{
                  // Active step styling (blue)
                  '& .MuiStepIcon-root': {
                    color: isActive ? '#1976d2' : isCompleted ? 'green' : 'gray',
                    fontSize: '1.5rem',  // Increasing icon size for better visibility
                  },
                  // Step label text styling
                  color: isActive ? '#1976d2' : isCompleted ? 'green' : 'gray',
                }}
              >
                <Typography variant="body1">
                  {status}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          onClick={() => alert('Navigating to order details')}
          variant="contained"
          color="primary"
        >
          View Order Details
        </Button>
      </Box>
    </Box>
  );
};

export default OrderStatusStepper;
