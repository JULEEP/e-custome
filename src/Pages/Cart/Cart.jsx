import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
  TextField,
} from '@mui/material';
import { EmptyCart } from '../../Assets/Images/Image';
import './Cart.css';

const Cart = () => {
  const { userId } = useParams(); // Get userId from URL
  const navigate = useNavigate(); // Hook for navigation
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false); // To control order form visibility
  const [orderData, setOrderData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: 'COD', // Default payment method
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/users/getcart/${userId}`);
        if (response.data.status) {
          setCart(response.data.cart);
          setCartTotal(response.data.cartTotal);
          setSubTotal(response.data.subTotal);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleCheckout = () => {
    setShowOrderForm(true);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!orderData.fullName || !orderData.email || !orderData.phone || !orderData.address || !orderData.city || !orderData.country) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`https://admin-backend-rl94.onrender.com/api/orders/create-order/${userId}`, {
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData,
      });

      if (response.data.status) {
        // Navigate to Get Orders page after successful order
        navigate(`/orders/${userId}`);
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order');
    }
  };

  if (loading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', marginTop: 8, color: '#1976d2', fontWeight: 'bold' }}
        >
          Your Cart!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6, alignItems: 'center', flexDirection: 'column', width: '100%' }}>
          {cart.length === 0 ? (
            <div className="main-card">
              <img src={EmptyCart} alt="Empty_cart" className="empty-cart-img" />
              <Typography variant="h6" sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>
                Your Cart is Empty
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3} sx={{ width: '100%' }}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  {cart.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.product}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia component="img" height="140" image={item.images[0]} alt={item.name} />
                        <CardContent>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                          <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {`Price: $${item.price}`}
                          </Typography>
                          <Typography variant="body1">
                            Quantity: {item.quantity}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Typography variant="h5">{`Subtotal: ${subTotal}`}</Typography>
                <Typography variant="h5">{`Total: ${cartTotal}`}</Typography>
                <Button variant="contained" color="primary" sx={{ marginBottom: 20 }} onClick={handleCheckout}>
                  Checkout
                </Button>
              </Box>
                {showOrderForm && (
                  <Box sx={{ marginBottom: 20 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2', }}>Shipping Details</Typography>
                    <Grid container spacing={2}>
                      {['fullName', 'email', 'phone', 'address', 'city', 'country', 'paymentMethod'].map((field) => (
                        <Grid item xs={6} key={field}>
                          <TextField
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            variant="outlined"
                            name={field}
                            value={orderData[field]}
                            onChange={handleOrderChange}
                            sx={{ marginBottom: 2 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Button variant="contained" color="secondary" sx={{ marginBottom: 20 }} onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Cart;
