import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to product detail pages
import './BestChoices.css'; // Optional: add a new CSS file for styling

const BestChoices = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate for routing

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://admin-backend-rl94.onrender.com/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set all products without any filtering
      } catch (err) {
        setError(err.message); // Set error if fetch fails
      } finally {
        setIsLoading(false); // Stop loading when done
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Handle click on product card to navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="best-choices-container">
      <h2>Best Choices</h2>
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
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
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

export default BestChoices;
