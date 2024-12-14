import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './SinglePro.css';
import { FaShoppingCart, FaHeart, FaPlus, FaShieldAlt, FaUndoAlt, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Make sure you have this installed for toasts
import SimilarProductsPage from '../SimilarProduct/SimilarProductPage';
import Footer from '../../Components/Footer/Footer';

const SinglePro = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  // Extract the first image from the array
  const productImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '';

  return (
    <>
    <div className="single-product">
      <div className="image-wrapper">
        <img src={productImage} alt={product.name} />
      </div>
      <div className="details-section">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="product-price">Price: {product.originalPrice}</p>

        {/* Product Details Section */}
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
        
        {/* Buttons Section */}
        <div className="button-group">
          <button onClick={handleAddToBag}>
            <FaShoppingCart /> Add to Cart
          </button>
          <button onClick={addToWishlist}>
            <FaHeart /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
    <SimilarProductsPage/>
    <Footer/>
    </>


  );
};

export default SinglePro;
