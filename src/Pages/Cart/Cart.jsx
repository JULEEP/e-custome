import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Box } from '@mui/material';
import { EmptyCart } from '../../Assets/Images/Image';  // Image when cart is empty
import './Cart.css';

const Cart = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const handleIncrement = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = async (productId) => {
    try {
      const payload = { productId };
      const response = await axios.delete(`https://admin-backend-rl94.onrender.com/api/users/delete-cart/${userId}`, {
        data: payload,
      });

      if (response.data.status) {
        setCart((prevCart) => prevCart.filter((item) => item.product !== productId));
        alert('Product removed from cart');
      } else {
        alert('Failed to remove product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout/${userId}`, {
      state: { cart, cartTotal, subTotal, userId }
    });
  };

  if (loading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  return (
    <Container>
      <Box className="cart-container">
        {/* Left Side (Product Details & Place Order Button) */}
        <Box className="left-side">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <img src={EmptyCart} alt="Empty cart" />
              <Typography variant="h6">Your cart is empty.</Typography>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={item.product}
                className={`cart-item ${index < cart.length - 1 ? 'with-border' : ''}`} // Add border class except for last item
              >
                {/* Product Image */}
                <div className="cart-item-image">
                  <img src={item.images[0]} alt={item.title} />
                </div>
                {/* Product Details */}
                <div className="cart-item-details">
                  <div className="cart-item-title">
                    <Typography variant="h6">{item.title}</Typography>
                  </div>
                  {/* Price above quantity controls */}
                  <div className="item-price">
                    <Typography variant="body1">₹{item.price}</Typography>
                  </div>
                  {/* Quantity controls (now under price) */}
                  <div className="quantity-controls">
                    <Button
                      variant="contained"
                      className="quantity-button"
                      onClick={() => handleDecrement(item.product)}
                    >
                      -
                    </Button>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <Button
                      variant="contained"
                      className="quantity-button"
                      onClick={() => handleIncrement(item.product)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                {/* Remove Button */}
                <div className="remove-button">
                  <Button
                    color="primary"
                    onClick={() => handleRemove(item.product)}
                    className="remove-btn"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="summary-item">
                <Typography variant="h6">Products in Cart: {cart.length}</Typography>
              </div>
              <div className="summary-item">
                <Typography variant="h6">Subtotal: ₹{subTotal}</Typography>
              </div>
              <div className="summary-item">
                <Typography variant="h6">Total: ₹{cartTotal}</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="place-order-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
