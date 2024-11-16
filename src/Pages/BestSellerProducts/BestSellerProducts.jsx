import React from 'react';
import './bestSellers.css';

// Create an array of product objects
const products = [
  {
    imageUrl: 'https://th.bing.com/th/id/OIP.Z_YWXCf0AmWWcTzuk-R-QAHaHa?pid=ImgDet&w=191&h=191&c=7',
    title: 'Hodings',
    price: 400
  },
  {
    imageUrl: 'https://th.bing.com/th/id/OIP.Crz8pVXsDF-q8QtPZlau_wHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7',
    title: 'Desk Calendar',
    price: 200
  },
  {
    imageUrl: 'https://th.bing.com/th/id/OIP.kye2r8yDHkwtYh6cpRZJggAAAA?w=332&h=166&c=7&r=0&o=5&pid=1.7',
    title: 'Family Poster',
    price: 900
  },
  {
    imageUrl: 'https://th.bing.com/th/id/OIP.cIRLI9VrJsAwY-VqmgFRzQHaFj?w=222&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'Wall Canvas Print',
    price: 1300
  },
  {
    imageUrl: 'https://th.bing.com/th/id/OIP.tcMi8pUQDtEMXGJdjGOhcQHaHa?w=150&h=150&c=6&o=5&pid=1.7',
    title: 'Visiting Card',
    price: 500
  }
];

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
            <p className="product-price">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
