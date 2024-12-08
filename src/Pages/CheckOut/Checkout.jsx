import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, TextField, Container, Grid, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const { userId } = location.state || {};  // Extract userId from state
  const { cart, cartTotal, subTotal } = location.state || {};
  const navigate = useNavigate();

  // Default addresses for the user
  const defaultAddresses = [
    {
      id: 'address1',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '9876543210',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA'
    },
    {
      id: 'address2',
      fullName: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '9876543211',
      address: '456 Elm Street',
      city: 'Los Angeles',
      country: 'USA'
    }
  ];

  const [selectedAddress, setSelectedAddress] = useState(defaultAddresses[0].id);  // Initially select the first address
  const [orderDetails, setOrderDetails] = useState(defaultAddresses[0]);  // Set default address details

  // Handle change in form fields
  const handleOrderDetailsChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address selection via radio buttons
  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    setSelectedAddress(addressId);

    const selected = defaultAddresses.find(address => address.id === addressId);
    setOrderDetails(selected);  // Set the form fields to the selected address
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

        {/* Address Selection with Radio Buttons */}
        <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
          <RadioGroup
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            {defaultAddresses.map((address) => (
              <FormControlLabel
                key={address.id}
                value={address.id}
                control={<Radio />}
                label={`${address.fullName} - ${address.address}`}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Shipping Details Form */}
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

        {/* Order Summary */}
        <Box className="price-summary" sx={{ marginTop: 3 }}>
          <Typography variant="h6" className="price-details-title">Order Summary:</Typography>

          <div className="summary-item">
            <Typography className="summary-title">Subtotal:</Typography>
            <Typography className="summary-value">₹{subTotal}</Typography>
          </div>

          <div className="summary-item">
            <Typography className="summary-title">Total:</Typography>
            <Typography className="summary-value">₹{cartTotal}</Typography>
          </div>

          <hr />

          <div className="summary-item">
            <Typography className="summary-title">Total Amount:</Typography>
            <Typography className="summary-value">₹{cartTotal}</Typography>
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
