import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Heart icons
import { Link, useNavigate } from "react-router-dom"; // To navigate to individual product pages
import "./AllProducts.css"; // Import custom styles

const AllProducts = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userWishlist, setUserWishlist] = useState([]);
  const [showAll, setShowAll] = useState(false); // State for showing all products
  const [quantity, setQuantity] = useState(1); // Default quantity for product

  const navigate = useNavigate();

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://admin-backend-rl94.onrender.com/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the products state
      } catch (err) {
        setError(err.message); // Set error if fetch fails
      } finally {
        setIsLoading(false); // Stop loading when done
      }
    };

    fetchProducts();
  }, []);

  // Fetch user wishlist when userId is available
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return; // Skip fetching wishlist if userId is not available

      try {
        const response = await fetch(
          `https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`
        );
        const data = await response.json();
        if (data.status) {
          setUserWishlist(data.wishlist); // Set the wishlist
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [userId]);

  // Handle wishlist click to toggle product
  const handleWishlistClick = async (productId) => {
    if (!userId) {
      alert("You must be logged in to add products to the wishlist.");
      return; // Prevent the API call if userId is not available
    }

    try {
      const response = await fetch(
        `https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        alert(data.message); // Show appropriate message based on whether added or removed
        // Update the wishlist state (toggle the product)
        setUserWishlist((prevWishlist) => {
          if (prevWishlist.includes(productId)) {
            return prevWishlist.filter((id) => id !== productId); // Remove from wishlist
          } else {
            return [...prevWishlist, productId]; // Add to wishlist
          }
        });
      } else {
        alert("Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      alert("An error occurred while updating the wishlist");
    }
  };

  // Handle Add to Cart functionality
  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId"); // Get the user ID from localStorage
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }

    // Prepare the payload for the API
    const payload = {
      productId: product._id,
      quantity: quantity, // Use the current quantity value
      customDesign: null, // Include custom design (base64 image) if present
      action: "increment", // Action to increment the quantity
      active: true, // Mark the item as active in the cart
    };

    try {
      const response = await fetch(
        `https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update cart");
      }

      const result = await response.json();
      console.log("Cart updated successfully:", result);
      navigate(`/cart/${userId}`); // Redirect to the cart page
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  // Handle Increment and Decrement functionality
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Increase quantity by 1
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrease quantity but not less than 1
  };

  // Handle the "Show All" functionality
  const displayedProducts = showAll ? products : products.slice(0, 5);

  return (
    <Container fixed>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <Box
          className="products-container"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          {displayedProducts.length === 0 ? (
            <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", width: "100%" }}>
              No products available
            </Typography>
          ) : (
            displayedProducts.map((product) => (
              <Card
                key={product._id}
                className="product-card"
                sx={{
                  margin: "10px",
                  flexShrink: 0,
                  maxWidth: 250, // Set max width of the card
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0] || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="product-image"
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <div
                      onClick={() => handleWishlistClick(product._id)} // Use handleWishlistClick
                      className="wishlist-heart-icon"
                    >
                      {userWishlist.includes(product._id) ? (
                        <IoMdHeart color="red" size={24} />
                      ) : (
                        <IoMdHeartEmpty color="gray" size={24} />
                      )}
                    </div>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ marginTop: 1 }}>
                    ₹{product.discountedPrice || product.originalPrice}
                  </Typography>

                  {/* Quantity Control */}
                  <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                    <Button variant="outlined" onClick={handleDecrement} sx={{ padding: "6px 12px" }}>
                      -
                    </Button>
                    <Typography sx={{ margin: "0 10px" }}>{quantity}</Typography>
                    <Button variant="outlined" onClick={handleIncrement} sx={{ padding: "6px 12px" }}>
                      +
                    </Button>
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1, padding: "6px 12px", fontSize: "0.875rem" }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}
    </Container>
  );
};

export default AllProducts;
