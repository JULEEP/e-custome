import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './SinglePro.css';
import { FaShoppingCart, FaHeart, FaPlus, FaShieldAlt, FaUndoAlt, FaCheckCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai'; // Import AiFillStar for star rating icons
import { toast } from 'react-toastify';
import SimilarProductsPage from '../SimilarProduct/SimilarProductPage';
import Footer from '../../Components/Footer/Footer';

const SinglePro = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false); // State for controlling the rating form visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://admin-backend-rl94.onrender.com/api/products/singleproduct/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not logged in!", { position: "top-right", autoClose: 3000 });
        return;
      }

      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, action: "increment" }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Added to Cart: ${data.product.name}, Quantity: ${data.product.quantity}`, { position: "top-right", autoClose: 3000 });
      } else {
        toast.error(`Failed to add to cart: ${data.message}`, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  const addToWishlist = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in!", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/wishlist/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, { position: "top-right", autoClose: 3000 });
      } else {
        toast.error(data.message, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleAddToBag = () => {
    const productId = product._id;
    addToCart(productId);
  };

  const handleEditDesign = () => {
    navigate(`/canvas`);
  };

  const handleUploadDesign = () => {
    setIsModalOpen(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleSaveDesign = async () => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('design', uploadedImage);

      try {
        const response = await fetch(`https://admin-backend-rl94.onrender.com/api/products/upload-design/${id}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Your design has been successfully uploaded. Now you can add it to the cart.", {
            position: "top-right",
            autoClose: 3000,
          });
          setIsModalOpen(false);
        } else {
          toast.error(data.message || "Failed to upload design", { position: "top-right", autoClose: 3000 });
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { position: "top-right", autoClose: 3000 });
      }
    } else {
      toast.error("Please upload a design before saving.", { position: "top-right", autoClose: 3000 });
    }
  };

  // Handle rating submission
  const submitRating = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in!", { position: "top-right", autoClose: 3000 });
      return;
    }

    const ratingData = { productId: product._id, rating, comment };

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/products/rate/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Rating submitted successfully!', { position: "top-right", autoClose: 3000 });
        setIsRatingFormOpen(false); // Close the form after successful submission
      } else {
        toast.error(data.message, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Failed to submit rating', { position: "top-right", autoClose: 3000 });
    }
  };

  const handleRateProductClick = () => {
    setIsRatingFormOpen(true); // Open the rating form when the button is clicked
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const productImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '';

  return (
    <div>
      <div className="single-product">
        <div className="image-wrapper">
          <img src={productImage} alt={product.name} />
        </div>
        <div className="details-section">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p id="product-price">Price: {product.originalPrice}</p>

          <div className="product-details">
            <h4>Product Details</h4>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>Flash Sale:</strong> {product.flashSale ? "Yes" : "No"}</p>
            <p><strong>Status:</strong> {product.status}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Color:</strong> {product.color}</p>
          </div>

          <div className="return-exchange-container">
            <div className="return-exchange-header">
              <h4 className="gray-text">15 Days Returns & Exchange</h4>
              <FaPlus
                className={`plus-icon ${isAccordionOpen ? "open" : ""}`}
                onClick={toggleAccordion}
              />
            </div>
            {isAccordionOpen && (
              <div className="accordion-content">
                <p className="return-exchange-text">
                  Easy returns up to 15 days of delivery. Exchange available on select pincodes.
                </p>
              </div>
            )}
          </div>

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

          <h3>Product Reviews</h3>
          <p className="verified-buyers">91% of verified buyers recommend this product</p>
          
          <div className="button-group">
            <button onClick={handleAddToBag}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={addToWishlist}>
              <FaHeart /> Add to Wishlist
            </button>
            <button onClick={handleEditDesign} className="edit-design-btn">
              ✏️ Edit Your Design
            </button>
            <button onClick={handleUploadDesign} className="upload-design-btn">
              📤 Upload Your Design
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Image Upload */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Upload Your Design</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleSaveDesign}>Save Design</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

     {/* Modal for Rating Form */}
{isRatingFormOpen && (
  <div className="rating-modal-overlay">
    <div className="rating-modal-content">
      <h3>Submit Your Rating</h3>
      <div className="rating-input">
        <span className="rating-label">Rating:</span>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="rating-select">
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
      </div>
      <div className="comment-input">
        <span className="comment-label">Comment:</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
          className="comment-textarea"
        />
      </div>
      <button onClick={submitRating}>Submit Rating</button>
      <button onClick={() => setIsRatingFormOpen(false)}>Cancel</button>
    </div>
  </div>
)}

      {/* Gray Divider */}
      <hr className="gray-divider" />

        <button className="rate-product-btn" onClick={handleRateProductClick}>Rate Product</button>

{/* Display Average Rating and Total Count */}
{product.ratings && product.ratings.length > 0 ? (
  <>
    <div className="ratings-summary">
      <div className="average-rating-container">
        <span className="average-rating">
          {(
            product.ratings.reduce((acc, cur) => acc + cur.rating, 0) /
            product.ratings.length
          ).toFixed(1)}
        </span>
        <span className="total-ratings">
          ({product.ratings.length} ratings and reviews)
        </span>
      </div>
    </div>

    {/* List Individual Reviews */}
    <div className="reviews-list">
      {product.ratings.map((rating) => (
        <div className="review" key={rating._id}>
          <div className="review-header">
            <div className="review-rating">
              <AiFillStar className="star-icon" />
              <span>{rating.rating}</span>
            </div>
            <div className="review-title">
              <strong>{rating.comment.split(" ")[0]}</strong>
            </div>
          </div>

          <div className="review-meta">
            <p className="reviewer-name">User ID: {rating.userId}</p>
            <p className="review-time">
              {new Date(rating.createdAt).toLocaleDateString()}
            </p>
            <p className="review-location">Certified Buyer</p>
          </div>

          <div className="review-comment">
            <p>{rating.comment}</p>
          </div>
        </div>
      ))}
    </div>
  </>
) : (
  <p className="no-reviews">No reviews available for this product.</p>
)}

{/* Similar Products and Footer */}
<SimilarProductsPage />
<Footer />
    </div>
  );
};

export default SinglePro;
