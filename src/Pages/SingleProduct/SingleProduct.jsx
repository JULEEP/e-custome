import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBolt, FaHeart, FaPlus, FaMinus } from "react-icons/fa"; // Added Plus and Minus icons
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams(); // Extract product ID from route params
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customDesign, setCustomDesign] = useState(null); // State for storing custom design (base64)
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch the product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://admin-backend-rl94.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data); // Ensure you have the product data in state
      } catch (err) {
        setError(err.message); // Set error if fetch fails
      } finally {
        setIsLoading(false); // Stop loading when done
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <p>Loading product...</p>; // Show loading state
  if (error) return <p className="error-message">{error}</p>; // Show error message

  // Handle Add to Cart functionality
  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    if (!userId) {
      alert('Please log in to add items to your cart');
      return;
    }

    // Prepare the payload for the API
    const payload = {
      productId: product._id,
      quantity: quantity, // Use the current quantity value
      customDesign: customDesign || null, // Include custom design (base64 image) if present
      action: "increment", // Action to increment the quantity
      active: true, // Mark the item as active in the cart
    };

    try {
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart');
      }

      const result = await response.json();
      console.log('Cart updated successfully:', result);
      navigate(`/cart/${userId}`); // Redirect to the cart page

    } catch (error) {
      console.error('Error adding to cart:', error.message);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  // Handle Increment and Decrement functionality
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Increase quantity by 1
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrease quantity but not less than 1
  };

  // Handle Customize functionality
  const handleCustomize = () => {
    const userId = localStorage.getItem('userId'); // Ensure the user is logged in
    if (!userId) {
      alert('Please log in to customize the product');
      return;
    }
    navigate(`/canvas/${id}`, { state: { product, userId } }); // Pass product data and userId to canvas
  };

  return (
    <div className="single-product-container">
      {/* Image Section */}
      <div className="product-image-container">
        <div className="image-wrapper">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        {/* Action Buttons */}
        <div className="image-buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>

          {/* Increment and Decrement Icons */}
          <div className="quantity-controls">
            <button className="decrement-button" onClick={handleDecrement}>
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button className="increment-button" onClick={handleIncrement}>
              <FaPlus />
            </button>
          </div>

          <button className="buy-now-button">
            <FaBolt /> Buy Now
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Size:</strong> {product.size}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>MOQ:</strong> {product.moq}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Type:</strong> {product.type}</p>
        <p><strong>Original Price:</strong> ₹{product.originalPrice}</p>
        <p><strong>Discounted Price:</strong> ₹{product.discountedPrice}</p>
        <p><strong>Status:</strong> {product.status}</p>
      </div>

      {/* Customize Button */}
      <div className="customize-button-container">
        <button onClick={handleCustomize} className="customize-product-button">
          Customize Product
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
