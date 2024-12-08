import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import menu and close icons
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  
  // Get userId from localStorage for dynamic routing
  const userId = localStorage.getItem('userId');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {/* Menu Icon for smaller screens */}
      <div className="menu-icon" onClick={toggleSidebar}>
        {isSidebarVisible ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => navigate(`/dashboard/${userId}`)}>
            <a href="#">Dashboard</a>
          </li>
          <li className="sidebar-item" onClick={() => navigate(`/orders/${userId}`)}>
            <a href="#">Orders</a>
          </li>
          <li className="sidebar-item" onClick={() => navigate(`/shipping-address/${userId}`)}>
            <a href="#">Addresses</a>
          </li>
          <li className="sidebar-item" onClick={() => navigate(`/userDetails/${userId}`)}>
            <a href="#">My Profile</a>
          </li>
          <li className="sidebar-item" onClick={() => navigate(`/wishlist/${userId}`)}>
            <a href="#">Wishlist</a>
          </li>
          <li className="sidebar-item" onClick={() => navigate(`/cart/${userId}`)}>
            <a href="#">Cart</a>
          </li>
          <li className="sidebar-item" onClick={() => {
            // Handle log out logic here
            localStorage.removeItem('userId');
            navigate('/login');
          }}>
            <a href="#">Log out</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
