import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Import both icons
import "./AllCarts.css";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div className="slick-prev" onClick={onClick} style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}>
      <span style={{ fontSize: "30px", color: "#333", cursor: "pointer" }}>&lt;</span>
    </div>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <div className="slick-next" onClick={onClick} style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}>
      <span style={{ fontSize: "30px", color: "#333", cursor: "pointer" }}>&gt;</span>
    </div>
  );
};

const AllCarts = () => {
  const [products, setProducts] = useState([]); // All products
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]); // Wishlist products
  const navigate = useNavigate(); // Hook for navigation

  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  // Fetch products and wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://admin-backend-rl94.onrender.com/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product click to navigate to individual product page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Handle wishlist click to toggle product
  const handleWishlistClick = async (productId) => {
    if (!userId) {
      alert("You must be logged in to add products to the wishlist.");
      return; // Prevent the API call if userId is not available
    }

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      const data = await response.json();

      if (data.status) {
        alert(data.message); // Show appropriate message based on whether added or removed
        // Update the wishlist state (toggle the product)
        setWishlist((prevWishlist) => {
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

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
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
              style={{ cursor: "pointer" }}
            >
              <div className="product-image-container">
                <img
                  src={product.images[0] || "https://via.placeholder.com/150"}
                  alt={product.name || "Product"}
                  className="product-image"
                />
                {/* Wishlist Icon */}
                <div
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent slider click event
                    handleWishlistClick(product._id);
                  }}
                >
                  {/* Toggle heart icon */}
                  {wishlist.includes(product._id) ? (
                    <IoMdHeart color="red" size={20} />
                  ) : (
                    <IoMdHeartEmpty color="gray" size={20} />
                  )}
                </div>
              </div>
              <div className="product-details">
                <h2 className="product-title">{product.name || "No Name Available"}</h2>
                <p className="product-price">₹{product.originalPrice || "N/A"}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default AllCarts;
