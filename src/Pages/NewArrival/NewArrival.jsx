import React from 'react';
import { FaShoppingBag, FaStar } from 'react-icons/fa';
import './NewArrival.css'


const NewArrival = () => {
  // Similar Products Data (dummy data)
  const similarProducts = [
    {
      id: 1,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 1",
      price: "₹599",
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 2",
      price: "₹799",
      rating: 4.0,
    },
    {
      id: 3,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 3",
      price: "₹1099",
      rating: 4.8,
    },
    {
      id: 4,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 4",
      price: "₹499",
      rating: 4.2,
    },
    {
      id: 5,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 5",
      price: "₹899",
      rating: 3.9,
    },
    {
      id: 6,
      image: "https://static.vecteezy.com/system/resources/previews/012/825/990/non_2x/flat-calendar-icon-calendar-on-the-wall-illustration-calendar-flat-daily-icon-template-illustration-emblem-free-vector.jpg",
      name: "Product 6",
      price: "₹1099",
      rating: 4.8,
    },
  ];

  return (
    <div className="similar-products-page">
      <h2>New Arrival</h2>
      <div className="similar-products-container">
        {similarProducts.map((product) => (
          <div key={product.id} className="similar-product-card">
            <img
              src={product.image}
              alt={product.name}
              className="similar-product-image"
            />
            <h4>{product.name}</h4>
            <p className="similar-product-price">{product.price}</p>
            <div className="similar-product-rating">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  color={index < product.rating ? "#FFD700" : "#D3D3D3"}
                />
              ))}
            </div>
            <button className="similar-product-cart-button">
              <FaShoppingBag /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
