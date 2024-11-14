// Import React and any required modules
import React from 'react';
// Import the CSS file for styling
import './bestSellers.css';

// Create an array of product objects
const products = Array(4).fill({
  imageUrl:
    'https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/Calendars/Desk%20Calendars/IN_Desk-calendars_Hero-image_01',
  title: 'Desk Calendars',
  price: 'Starting at ₹280.00',
});

// BestSellers component to render products
const BestSellers = () => {
  return (
    <div className="best-sellers-container">
      {/* Best Sellers Heading */}
      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-image" // Using custom class for styling
            />
            {/* Product Title */}
            <h2 className="product-title">{product.title}</h2>
            {/* Product Price */}
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
