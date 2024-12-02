import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, TextField, Container, Grid } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const { userId } = location.state || {};  // Extract userId from state
  const { cart, cartTotal, subTotal } = location.state || {};
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const handleOrderDetailsChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      cart,
      cartTotal,
      subTotal,
      shippingDetails: orderDetails,
    };

    try {
      const response = await axios.post(`https://admin-backend-rl94.onrender.com/api/orders/create-order/${userId}`, orderData);

      if (response.data.status) {
        alert('Order placed successfully!');
        navigate(`/orders/${userId}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Box className="left-side">
        <Typography variant="h4" className="cart-title">
          Checkout
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="fullName"
              value={orderDetails.fullName}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={orderDetails.email}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={orderDetails.phone}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={orderDetails.address}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={orderDetails.city}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={orderDetails.country}
              onChange={handleOrderDetailsChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Order Summary Below Form */}
        <Box className="order-summary-box" sx={{ marginTop: 3 }}>
          <Typography variant="h6" className="order-summary-title">Order Summary:</Typography>
          <div className="price-detail">
            <Typography variant="h6">Subtotal:</Typography>
            <Typography>₹{subTotal}</Typography>
          </div>
          <div className="price-detail">
            <Typography variant="h6">Total:</Typography>
            <Typography>₹{cartTotal}</Typography>
          </div>

          <div className="total-amount">
            <Typography variant="h6">Total Amount</Typography>
            <Typography>₹{cartTotal}</Typography>
          </div>
        </Box>

        {/* Place Order Button */}
        <Button
          variant="contained"
          className="place-order-button"
          onClick={handlePlaceOrder}
          sx={{ marginTop: 2 }}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
