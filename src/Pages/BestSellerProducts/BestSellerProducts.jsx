import React from 'react';
import './bestSellers.css';

// Create an array of product objects
const products = [
  {
    imageUrl: 'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F74%2F45%2F74459df176afa42ab24575b8315721cd5c837e11.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
    title: 'Women T-Shirt',
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
