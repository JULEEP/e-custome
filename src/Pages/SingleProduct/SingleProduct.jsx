import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaPlus,
  FaShieldAlt,
  FaUndoAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SingleProduct.css";
import SimilarProductsPage from "../SimilarProduct/SimilarProductPage";
import Footer from "../../Components/Footer/Footer";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://admin-backend-rl94.onrender.com/api/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product.");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);

  const addToCart = async (productId, quantity = 1) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("Please log in to add items to the cart.");

    try {
      const response = await fetch(
        `https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity, action: "increment" }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to add to cart.");
      toast.success(`Added to cart: ${data.product.name}, Quantity: ${data.product.quantity}`);
    } catch (error) {
      toast.error(error.message || "Unable to add to cart.");
    }
  };

  const addToWishlist = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("Please log in to add items to the wishlist.");

    try {
      const response = await fetch(
        `https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to add to wishlist.");
      toast.success(data.message || "Added to wishlist.");
    } catch (error) {
      toast.error(error.message || "Unable to add to wishlist.");
    }
  };

  const handleEditDesign = () => navigate(`/canvas`, { state: { product } });

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <div className="single-product-container">
        <div className="product-image-container">
          {product.images?.length ? (
            <img src={product.images[0]} alt={product.name} className="product-image" />
          ) : (
            <img
              src="https://via.placeholder.com/300"
              alt="Placeholder"
              className="product-image"
            />
          )}
        </div>

        <div className="product-details">
          <h1>{product.name || "Product Name"}</h1>
          <p className="product-description">{product.description || "No description available."}</p>
          <p className="product-price">
            ₹{product.discountedPrice || product.originalPrice || "N/A"}
          </p>

          <p className="product-ratings">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < (product.rating || 4) ? "#FFD700" : "#D3D3D3"} />
            ))}{" "}
            ({product.rating || "4.5"}/5)
          </p>

          <div className="button-group">
            <button onClick={() => addToCart(product._id)}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={addToWishlist}>
              <FaHeart /> Add to Wishlist
            </button>
            <button onClick={handleEditDesign}>
              ✏️ Edit Your Design
            </button>
          </div>

          {/* Return & Exchange Accordion */}
          <div className="return-exchange-container">
            <div className="return-exchange-header" onClick={toggleAccordion}>
              <h4>15 Days Returns & Exchange</h4>
              <FaPlus className={`plus-icon ${isAccordionOpen ? "open" : ""}`} />
            </div>
            {isAccordionOpen && (
              <div className="accordion-content">
                <p>Easy returns up to 15 days of delivery. Exchange available on select pincodes.</p>
              </div>
            )}
          </div>

          {/* Secure Payment Information */}
          <div className="secure-info-container">
            <div className="secure-item">
              <FaShieldAlt className="secure-icon" />
              <p>100% Secure Payment</p>
            </div>
            <div className="secure-item">
              <FaUndoAlt className="secure-icon" />
              <p>Easy Returns and Refunds</p>
            </div>
            <div className="secure-item">
              <FaCheckCircle className="secure-icon" />
              <p>100% Genuine Product</p>
            </div>
          </div>
        </div>
      </div>

      <SimilarProductsPage />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SingleProduct;
