import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaPlus, FaShieldAlt, FaUndoAlt, FaCheckCircle, FaStar } from "react-icons/fa"; 
import './SingleProduct.css';
import SimilarProductsPage from "../SimilarProduct/SimilarProductPage";
import Footer from "../../Components/Footer/Footer";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Accordion state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://admin-backend-rl94.onrender.com/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToBag = () => {
    alert("Added to Bag!");
  };

  const handleWishlist = () => {
    alert("Added to Wishlist!");
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="single-product-container">
      {/* Left Side: Image */}
      <div className="product-image-container">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="product-image" />
        ) : (
          <p>No Image Available</p>
        )}
      </div>

      {/* Right Side: Details */}
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p><strong>Description:</strong> {product.description}</p>
        <p className="product-price">₹{product.discountedPrice || product.originalPrice}</p>
        <p className="product-ratings">★★★★☆ (4.5/5)</p>
        <p><strong>Available Sizes:</strong> M, L, XL</p>

        {/* Buttons */}
        <div className="buttons-container">
          <button className="add-to-bag-button" onClick={handleAddToBag}>
            <FaShoppingBag /> Add to Bag
          </button>
          <button className="wishlist-button" onClick={handleWishlist}>
            <FaHeart /> Wishlist
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

        {/* 15 Days Returns & Exchange Section */}
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

        {/* Secure Payment, Easy Returns, and Genuine Product */}
        <div className="secure-info-container">
          {/* 100% Secure Payment */}
          <div className="secure-item">
            <FaShieldAlt className="secure-icon" />
            <p className="secure-text">100% Secure Payment</p>
          </div>

          {/* Easy Returns and Instant Refunds */}
          <div className="secure-item">
            <FaUndoAlt className="secure-icon" />
            <p className="secure-text">Easy Returns and Instant Refunds</p>
          </div>

          {/* 100% Genuine Product */}
          <div className="secure-item">
            <FaCheckCircle className="secure-icon" />
            <p className="secure-text">100% Genuine Product</p>
          </div>
        </div>
        <h3>Product Reviews</h3>
        <p className="verified-buyers">91% of verified buyers recommend this product</p>
      </div>
    </div>
    <SimilarProductsPage/>
    <Footer/>
    </>
  );
};

export default SingleProduct;
