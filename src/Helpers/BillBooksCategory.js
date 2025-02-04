import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FaShoppingBag, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BillBooksCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoardingsProducts = async () => {
      try {
        const response = await axios.get("https://admin-backend-rl94.onrender.com/api/products/getBillBooks");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchHoardingsProducts();
  }, []);

  const handleProductClick = (id) => {
    if (id) {
      navigate(`/single-product/${id}`);
    } else {
      console.error("Invalid product ID:", id);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId");
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
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Bill Books Products
      </Typography>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Box
                onClick={() => handleProductClick(product._id)}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  maxWidth: '300px',
                  margin: 'auto',
                  cursor: 'pointer',
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
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1">₹{product.originalPrice}</Typography>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} color={index < product.rating ? '#FFD700' : '#D3D3D3'} />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id);
                  }}
                  style={{
                    backgroundColor: '#f5a623',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    marginTop: '10px',
                    width: '100%',
                    maxWidth: '220px',
                  }}
                >
                  <FaShoppingBag /> Add to Cart
                </button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BillBooksCategory;
