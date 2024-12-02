import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  CssBaseline,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'; // Heart icons
import { EmptyWishlist } from '../../Assets/Images/Image'; // Placeholder image for empty wishlist
import './wishlist.css';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userWishlist, setUserWishlist] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the userId from localStorage
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch wishlist data from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/get-wishlist/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setWishlist(data.wishlist); // Set wishlist data
          setUserWishlist(data.wishlist.map(product => product._id)); // Store wishlist product IDs for toggle
        } else {
          setError(data.message || 'Failed to fetch wishlist');
        }
      } catch (err) {
        setError('An error occurred while fetching the wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  // Handle the addition/removal of products to the wishlist
  const handleWishlistToggle = async (productId) => {
    if (!userId) {
      alert("You must be logged in to add products to the wishlist.");
      return;
    }

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      
      if (data.status) {
        setUserWishlist(prev => {
          if (prev.includes(productId)) {
            return prev.filter(id => id !== productId); // Remove product from wishlist
          } else {
            return [...prev, productId]; // Add product to wishlist
          }
        });
      } else {
        alert('Failed to update wishlist');
      }
    } catch (err) {
      alert('An error occurred while updating the wishlist');
    }
  };

  // Handle Add to Cart functionality
  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    if (!userId) {
      alert('Please log in to add items to your cart');
      return;
    }

    // Prepare the payload for the API
    const payload = {
      productId: product._id,
      quantity: 1, // Default to 1 for simplicity
      customDesign: null, // Include custom design if present (optional)
      action: "increment", // Action to increment the quantity
      active: true, // Mark the item as active in the cart
    };

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart');
      }

      const result = await response.json();
      console.log('Cart updated successfully:', result);
      navigate(`/cart/${userId}`); // Redirect to the cart page

    } catch (error) {
      console.error('Error adding to cart:', error.message);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', marginTop: 10, color: '#1976d2', fontWeight: 'bold' }}
        >
          Your Wishlist
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Typography variant="h6">Loading...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Typography variant="h6" color="error">{error}</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
            {wishlist.length === 0 ? (
              <div className="main-card">
                <img
                  src={EmptyWishlist}
                  alt="Empty Wishlist"
                  className="empty-cart-img"
                />
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
                >
                  Please add some products to your wishlist!
                </Typography>
              </div>
            ) : (
              <Grid container spacing={0}>
                {wishlist.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ margin: 0 }}>
                    <Card className="wishlist-card">
                      {/* Image at the top */}
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.images[0] || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="wishlist-image"
                      />

                      {/* Product details below the image */}
                      <CardContent className="wishlist-details">
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.description}
                        </Typography>
                        <Typography variant="body1" color="primary">
                          ₹{product.originalPrice}
                        </Typography>

                        {/* Heart Icon for Wishlist */}
                        <div className="wishlist-heart-icon" onClick={() => handleWishlistToggle(product._id)}>
                          {userWishlist.includes(product._id) ? (
                            <IoMdHeart color="red" size={24} />
                          ) : (
                            <IoMdHeartEmpty color="gray" size={24} />
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginTop: 2 }}
                          onClick={() => handleAddToCart(product)} // Call handleAddToCart on click
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default WishList;
