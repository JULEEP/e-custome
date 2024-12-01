import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllProducts.css"; // Optional: Add custom styles for the product listing

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://admin-backend-rl94.onrender.com/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data); // Log the fetched data to see the structure
        setProducts(data); // Set the products state
      } catch (err) {
        setError(err.message); // Set error if fetch fails
        console.error("Error fetching products:", err); // Log error details
      } finally {
        setIsLoading(false); // Stop loading when done
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <p>Loading products...</p>; // Show loading state
  if (error) return <p className="error-message">{error}</p>; // Show error message

  return (
    <div className="all-products-container">
      <h1>All Products</h1>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                {/* Check if product images exist and render them */}
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]} // Directly use the image URL
                    alt={product.name}
                    className="product-image-img"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>Price: ₹{product.discountedPrice || "N/A"}</p>
                <p>{product.description || "No description available"}</p>
              </div>

              {/* Navigate to the SingleProduct page on click */}
              <Link to={`/product/${product._id}`} className="product-link">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No products available</p> // Show a message if there are no products
        )}
      </div>
    </div>
  );
};

export default AllProducts;
