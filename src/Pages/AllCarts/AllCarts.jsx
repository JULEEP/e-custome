import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";  // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import "./AllCarts.css";

// Custom Left Arrow
const CustomPrevArrow = ({ onClick }) => {
  return (
    <div className="slick-prev" onClick={onClick} style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}>
      <span style={{ fontSize: "30px", color: "#333", cursor: "pointer" }}>&lt;</span>
    </div>
  );
};

// Custom Right Arrow
const CustomNextArrow = ({ onClick }) => {
  return (
    <div className="slick-next" onClick={onClick} style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}>
      <span style={{ fontSize: "30px", color: "#333", cursor: "pointer" }}>&gt;</span>
    </div>
  );
};

const AllCarts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://admin-backend-rl94.onrender.com/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Assuming API returns an array of products
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to the single product page
  };

  // Slider settings with custom arrows
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 5 products at a time
    slidesToScroll: 1, // Scroll 1 product at a time
    prevArrow: <CustomPrevArrow />, // Custom left arrow
    nextArrow: <CustomNextArrow />, // Custom right arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 products on smaller screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 product on mobile
        },
      },
    ],
  };

  return (
    <div className="all-carts-container">
      {isLoading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <Slider {...settings}>
          {products.map((product, index) => (
            <div
              key={index}
              className="product-item"
              onClick={() => handleProductClick(product._id)} // Handle click
              style={{ cursor: "pointer" }} // Indicate clickable items
            >
              <img
                src={product.images[0] || "https://via.placeholder.com/150"}
                alt={product.name || "Product"}
                className="product-image"
              />
              <h2 className="product-title">{product.name || "No Name Available"}</h2>
              <p className="product-price">₹{product.originalPrice || "N/A"}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default AllCarts;
