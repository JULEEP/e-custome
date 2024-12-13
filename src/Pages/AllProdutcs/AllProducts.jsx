import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to individual product pages
import './AllProducts.css'; // Import the CSS file for styling

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State for showing all products

  const navigate = useNavigate(); // useNavigate for routing

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

  // Handle the "Show All" functionality
  const displayedProducts = showAll ? products : products.slice(0, 5);

  // Handle click on product card to navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="products-container">
      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="products-list">
          {displayedProducts.length === 0 ? (
            <p>No products available</p>
          ) : (
            displayedProducts.map((product) => (
              <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
                <img
                  className="product-image"
                  src={product.images[0] || "https://via.placeholder.com/150"}
                  alt={product.name}
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>₹{product.discountedPrice || product.originalPrice}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
