import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import "./NewArrival.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Number of visible products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://admin-backend-rl94.onrender.com/api/products/getall");
        console.log("Fetched products:", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
    } else {
      console.error("Invalid product ID:", id);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not logged in!", {
          position: "top-right",
          autoClose: 3000,
        });
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
        toast.success(`Product Added to Cart`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to add to cart: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleExploreMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4); // Increment visible products by 4
  };

  return (
    <div className="similar-products-page">
      <h2>New Arrival</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="similar-products-container">
        {products.slice(0, visibleProducts).map((product) => (
          <div
            key={product._id || product.id}
            className="similar-product-card"
            onClick={() => handleProductClick(product._id || product.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/150"}
              alt={product.name}
              className="similar-product-image"
            />
            <h4>{product.name}</h4>
            <p className="similar-product-price">₹{product.originalPrice}</p>
            <button
              className="similar-product-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product._id);
              }}
            >
              <FaShoppingBag /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      {visibleProducts < products.length && (
        <button
          className="explore-more-button"
          onClick={handleExploreMore}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          EXPLORE MORE
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default NewArrival;
