import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const statuses = [
  "Draft",
  "Payment Pending",
  "Payment Confirmed",
  "Order Confirmed",
  "Print Ready",
  "Shipped"
];

const OrderStatusStepper = () => {
  const { orderId } = useParams();  // Get orderId from the URL parameters
  const [orderStatusHistory, setOrderStatusHistory] = useState([]);  // State to store order status history
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  const [activeStep, setActiveStep] = useState(0);  // Active step (current status)

  // Use Material-UI's useTheme and useMediaQuery for responsive design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  // True if the screen width is <= 600px

  // Fetch order status history when component mounts
  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing.");
      setLoading(false);
      return;
    }

    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/orderStatus/${orderId}`);
        console.log('Order Status History:', response.data.orderStatusHistory); // Log the data

        setOrderStatusHistory(response.data.orderStatusHistory);  // Set the fetched status history
        setActiveStep(response.data.orderStatusHistory.length);  // Set active step based on the history length
      } catch (err) {
        setError('Error fetching order status');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there is an error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        orientation={isSmallScreen ? "vertical" : "horizontal"}  // Change orientation based on screen size
      >
        {statuses.map((status, index) => {
          // Check if status is present in orderStatusHistory
          const isCompleted = orderStatusHistory.some(orderStatus => orderStatus === status);
          const isActive = index === activeStep - 1;  // Check if the current step is the active one

          return (
            <Step key={index}>
              <StepLabel
                sx={{
                  '& .MuiStepIcon-root': {
                    color: isActive ? '#1976d2' : isCompleted ? 'green' : 'gray', // Mark as blue if active, green if completed, gray otherwise
                    fontSize: '1.5rem',
                  },
                  color: isActive ? '#1976d2' : isCompleted ? 'green' : 'gray',  // Mark as blue if active, green if completed, gray otherwise
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
