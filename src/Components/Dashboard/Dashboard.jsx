import React, { useState } from 'react';
import './Dashboard.css';
import { FaShoppingCart, FaAddressCard, FaUserAlt, FaHeart, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa'; // Use a cart icon for the "Carts" section
import Sidebar from '../SideBar/SideBar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const userId = localStorage.getItem('userId'); // Adjust based on how you store user ID

  return (
    <div className="dashboard-container">
      {/* Menu Icon for mobile */}
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      
      {/* Sidebar Component */}
      <Sidebar className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`} />
      
      {/* Dashboard Content */}
      <div className={`dashboard ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <div className="card" onClick={() => navigate(`/orders/${userId}`)}>
          <FaShoppingCart className="card-icon" />
          <p className="card-text">Orders</p>
        </div>
        <div className="card">
          <FaAddressCard className="card-icon" />
          <p className="card-text">Addresses</p>
        </div>
        <div className="card">
          <FaUserAlt className="card-icon" />
          <p className="card-text">Account Details</p>
        </div>
        <div className="card" onClick={() => navigate(`/wishlist/${userId}`)}>
          <FaHeart className="card-icon" />
          <p className="card-text">Wishlist</p>
        </div>
        <div className="card" onClick={() => navigate(`/cart/${userId}`)}> {/* Navigate to the Cart page */}
          <FaCartPlus className="card-icon" />
          <p className="card-text">Carts</p>
        </div>
        <div className="card">
          <FaSignOutAlt className="card-icon" />
          <p className="card-text">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
