import React from 'react';
import './Order.css'; // Add a CSS file for styling
import Sidebar from '../../Components/SideBar/SideBar';

const Order = () => {
  const isOrderEmpty = true; // Simulate empty order condition

  return (
    <div className="order-container">
    <Sidebar/>
      {isOrderEmpty ? (
        <div className="empty-order">
          <img
            src="https://cdn.dribbble.com/users/776386/screenshots/2677382/media/d151b22c922f56c7c989c1efcf8a1c2d.jpg?compress=1&resize=700x525&vertical=center"
            alt="Empty Order History"
            className="empty-order-image"
          />
          <p className="empty-order-text">Order house is empty</p>
        </div>
      ) : (
        <div className="order-content">
          {/* Add your order list or details here */}
        </div>
      )}
    </div>
  );
};

export default Order;
