import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaPlus,
  FaShieldAlt,
  FaUndoAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import "./SingleProduct.css";
import SimilarProductsPage from "../SimilarProduct/SimilarProductPage";
import Footer from "../../Components/Footer/Footer";

const SingleProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Accordion state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://admin-backend-rl94.onrender.com/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data); // Set the product data
      } catch (err) {
        setError(err.message); // Set error if API fails
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    fetchProduct();
  }, [id]);

  // Function to add product to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
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
        toast.success(`Added to Cart: ${data.product.name}, Quantity: ${data.product.quantity}`, {
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

  // Function to add product to wishlist
  const addToWishlist = async () => {
    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
    if (!userId) {
      toast.error("User not logged in!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id, // The product ID of the current product
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(data.message, {
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

  // Handle "Add to Bag" action
  const handleAddToBag = () => {
    const productId = product._id; // Assuming `product._id` contains the product's ID
    addToCart(productId);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen); // Toggle accordion state
  };

  // Show loading or error if applicable
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="single-product-container">
        {/* Left Section: Product Image */}
        <div className="product-image-container">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} className="product-image" />
          ) : (
            <p>No Image Available</p>
          )}
        </div>

        {/* Right Section: Product Details */}
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p className="product-price">₹{product.discountedPrice || product.originalPrice}</p>
          <p className="product-ratings">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < product.rating ? "#FFD700" : "#D3D3D3"} />
            ))}{" "}
            ({product.rating || "4.5"}/5)
          </p>
          <p>
            <strong>Available Sizes:</strong> {product.availableSizes?.join(", ") || "M, L, XL"}
          </p>

          {/* Action Buttons */}
          <div className="buttons-container">
            <button className="add-to-bag-button" onClick={handleAddToBag}>
              <FaShoppingBag /> Add to Bag
            </button>
            <button className="wishlist-button" onClick={addToWishlist}>
              <FaHeart /> Add to Wishlist
            </button>
          </div>

          {/* Key Highlights */}
          <div className="key-highlights">
            <h3>Key Highlights</h3>
            <ul>
              <li>High-quality material</li>
              <li>Available in multiple sizes</li>
              <li>Free shipping on orders above ₹500</li>
            </ul>
          </div>

          {/* Accordion Section: Return & Exchange Policy */}
          <div className="return-exchange-container">
            <div className="return-exchange-header">
              <h4>15 Days Returns & Exchange</h4>
              <FaPlus
                className={`plus-icon ${isAccordionOpen ? "open" : ""}`}
                onClick={toggleAccordion}
              />
            </div>
            <h5 className="return-exchange-subheading">Know about return & exchange policy</h5>
            {isAccordionOpen && (
              <div className="accordion-content">
                <p className="return-exchange-text">
                  Easy returns up to 15 days of delivery. Exchange available on select pincodes.
                </p>
              </div>
            )}
          </div>

          {/* Secure Payment Information */}
          <div className="secure-info-container">
            <div className="secure-item">
              <FaShieldAlt className="secure-icon" />
              <p className="secure-text">100% Secure Payment</p>
            </div>
            <div className="secure-item">
              <FaUndoAlt className="secure-icon" />
              <p className="secure-text">Easy Returns and Instant Refunds</p>
            </div>
            <div className="secure-item">
              <FaCheckCircle className="secure-icon" />
              <p className="secure-text">100% Genuine Product</p>
            </div>
          </div>

          {/* Product Reviews Section */}
          <h3>Product Reviews</h3>
          <p className="verified-buyers">91% of verified buyers recommend this product</p>
        </div>
      </div>

      {/* Similar Products & Footer */}
      <SimilarProductsPage />
      <Footer />

      {/* Toastify Notification Container */}
      <ToastContainer />
    </>
  );
};

export default SingleProduct;
