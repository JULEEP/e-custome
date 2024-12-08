import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import { EmptyCart } from '../../Assets/Images/Image';  // Image when cart is empty
import './Cart.css';

const Cart = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to calculate total and subtotal
  const calculateTotals = (cart) => {
    let newCartTotal = 0;
    let newSubTotal = 0;

    cart.forEach(item => {
      newSubTotal += item.price * item.quantity;  // Subtotal is the sum of individual item totals
      newCartTotal += item.price * item.quantity;  // You can add additional logic for taxes or discounts
    });

    return { newCartTotal, newSubTotal };
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/users/getcart/${userId}`);
        if (response.data.status) {
          const fetchedCart = response.data.cart;
          setCart(fetchedCart);

          // Recalculate the totals for the initial cart data
          const { newCartTotal, newSubTotal } = calculateTotals(fetchedCart);
          setCartTotal(newCartTotal);
          setSubTotal(newSubTotal);
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
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      
      // Recalculate the totals after the update
      const { newCartTotal, newSubTotal } = calculateTotals(updatedCart);
      setCartTotal(newCartTotal);
      setSubTotal(newSubTotal);

      return updatedCart;
    });
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      // Recalculate the totals after the update
      const { newCartTotal, newSubTotal } = calculateTotals(updatedCart);
      setCartTotal(newCartTotal);
      setSubTotal(newSubTotal);

      return updatedCart;
    });
  };

  const handleRemove = async (productId) => {
    try {
      const payload = { productId };
      const response = await axios.delete(`https://admin-backend-rl94.onrender.com/api/users/delete-cart/${userId}`, {
        data: payload,
      });

      if (response.data.status) {
        setCart((prevCart) => {
          const updatedCart = prevCart.filter((item) => item.product !== productId);

          // Recalculate the totals after the update
          const { newCartTotal, newSubTotal } = calculateTotals(updatedCart);
          setCartTotal(newCartTotal);
          setSubTotal(newSubTotal);

          return updatedCart;
        });
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

        {/* Price Summary Section */}
        {cart.length > 0 && (
          <div className="price-summary">
            <div className="summary-item">
              <Typography variant="h6" className="summary-title">PRICE SUMMARY</Typography>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total MRP (Incl. of taxes):</div>
              <div className="summary-value">₹{cartTotal}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Bag Discount:</div>
              <div className="summary-value">₹0</div> {/* Replace with actual discount logic */}
            </div>
            <div className="summary-item">
              <div className="summary-label">Delivery:</div>
              <div className="summary-value delivery-free">Free</div>
            </div>

            <hr />

            <div className="summary-item">
              <div className="summary-label">Subtotal:</div>
              <div className="summary-value">₹{subTotal}</div>
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
  );
};

export default Cart;
