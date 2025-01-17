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

  // New states for paper size, name, color, quantity, and dynamic price
  const [paperSize, setPaperSize] = useState('');
  const [paperName, setPaperName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [dynamicPrice, setDynamicPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://admin-backend-rl94.onrender.com/api/products/singleproduct/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        // Set initial values based on product variations
        if (data.variations && data.variations.length > 0) {
          const defaultVariation = data.variations[0];
          setPaperSize(defaultVariation.paperSize);
          setPaperName(defaultVariation.paperName);
          setColor(defaultVariation.color);
          setQuantity(defaultVariation.quantity);
          setDynamicPrice(defaultVariation.price); // Set dynamic price for the first variation
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);
  
  useEffect(() => {
    if (product && paperSize && paperName && color) {
      const selectedVariation = product.variations.find(
        (v) => v.paperSize === paperSize && v.paperName === paperName && v.color === color
      );
      if (selectedVariation) {
        setDynamicPrice(selectedVariation.price * quantity); // Update dynamic price when variations change
      }
    }
  }, [paperSize, paperName, quantity, color, product]);
  
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const addToCart = async (productId, quantity = 1, variationId = null, action = "increment") => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not logged in!", { position: "top-right", autoClose: 3000 });
        return;
      }
  
      const body = JSON.stringify({
        productId,
        quantity,
        variationId: variationId || null,  // Make sure variationId is passed correctly
        action,
      });
  
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success(`Updated Cart: ${data.cart.products[0].product.name}, Quantity: ${data.cart.products[0].quantity}`, { position: "top-right", autoClose: 3000 });
        console.log('Updated cart details:', data.cart);
      } else {
        toast.error(`Failed to update cart: ${data.message}`, { position: "top-right", autoClose: 3000 });
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
  
    // Find the selected variation by the current paperSize, paperName, and color
    const selectedVariation = product.variations.find(
      (v) => v.paperSize === paperSize && v.paperName === paperName && v.color === color
    );
    
    // If variation is found, pass its _id as the variationId
    const variationId = selectedVariation ? selectedVariation._id : null;
  
    // Now call addToCart with the correct variationId
    addToCart(productId, quantity, variationId);
  };
  
  

  const handleEditDesign = () => {
    navigate(`/templateeditor/${product._id}`);  // Use product._id dynamically
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
      <p id="product-price">Price: {product.originalPrice}</p> {/* Displaying original price */}
      <p id="dynamic-price">Total Price: {dynamicPrice}</p> {/* Dynamically calculated price */}

          <div className="product-details">
            <h4>Product Details</h4>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>Flash Sale:</strong> {product.flashSale ? "Yes" : "No"}</p>
            <p><strong>Status:</strong> {product.status}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Material:</strong> {product.material}</p>
          </div>

          {/* Dynamic Variations Section */}
          <div className="product-variations">
            <label>
              Paper Size:
              <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
                {product.variations && product.variations.map((variation, index) => (
                  <option key={index} value={variation.paperSize}>{variation.paperSize}</option>
                ))}
              </select>
            </label>
            <label>
              Paper Name:
              <select value={paperName} onChange={(e) => setPaperName(e.target.value)}>
                {product.variations && product.variations.map((variation, index) => (
                  <option key={index} value={variation.paperName}>{variation.paperName}</option>
                ))}
              </select>
            </label>
            <label>
              Color:
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                {product.variations && product.variations.map((variation, index) => (
                  <option key={index} value={variation.color}>{variation.color}</option>
                ))}
              </select>
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.quantity}
              />
            </label>
          </div>

         <div className="button-group">
            <button onClick={handleAddToBag}>
               Add to Cart
            </button>
            <button onClick={addToWishlist}>
              Add to Wishlist
            </button>
            <button onClick={handleEditDesign} className="edit-design-btn">
              Edit
            </button>
            <button onClick={handleUploadDesign} className="upload-design-btn">
            Upload Your Design
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

