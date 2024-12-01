import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import menu and close icons
import './Sidebar.css';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
          <li className="sidebar-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="sidebar-item">
            <a href="/user-orders">Orders</a>
          </li>
          <li className="sidebar-item">
            <a href="/address">Addresses</a>
          </li>
          <li className="sidebar-item">
            <a href="#profile">My Profile</a>
          </li>
          <li className="sidebar-item">
            <a href="#wishlist">Wishlist</a>
          </li>
          <li className="sidebar-item">
            <a href="#logout">Log out</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
