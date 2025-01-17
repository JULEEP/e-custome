import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FaShoppingBag, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Import toast for notifications

const SchoolCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Fliers products on page load
  useEffect(() => {
    const fetchFliersProducts = async () => {
      try {
        const response = await axios.get("https://admin-backend-rl94.onrender.com/api/products/getschool");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchFliersProducts();
  }, []);

  // Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId"); // Assuming user is logged in
      if (!userId) {
        toast.error("Please log in to add products to your cart.");
        return;
      }

      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          action: "increment",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product added to cart!");
      } else {
        toast.error(`Failed to add product: ${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginBottom: '30px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        School Products
      </Typography>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product._id}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  boxSizing: 'border-box',  // Ensure padding is included in width calculation
                  maxWidth: '300px', // Set a max width for the card
                  margin: 'auto', // Center the card horizontally
                  marginBottom: '20px', // Add bottom margin to space out the cards
                }}
              >
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Typography variant="h6" sx={{ marginTop: '10px' }}>{product.name}</Typography>
                <Typography variant="body2" sx={{ marginTop: '5px' }}>{product.description}</Typography>
                <Typography variant="body1" sx={{ marginTop: '5px' }}>₹{product.originalPrice}</Typography>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} color={index < product.rating ? '#FFD700' : '#D3D3D3'} />
                  ))}
                </div>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    width: '100%',
                  }}
                >
                  <button
                    onClick={() => addToCart(product._id)}
                    style={{
                      backgroundColor: '#f5a623',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      width: '100%',  // Ensure button width is 100% of the container
                      maxWidth: '220px', // Limit the max width of the button
                    }}
                  >
                    <FaShoppingBag /> Add to Cart
                  </button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SchoolCategory;
