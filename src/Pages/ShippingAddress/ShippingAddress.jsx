import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import './ShippingAddress.css'
const ShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  useEffect(() => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    
    // Check if userId exists
    if (!userId) {
      setError('User ID not found. Please log in.');
      navigate('/login');  // Redirect to login if userId is missing
      return;  // Early return if userId is missing
    }

    // Fetch shipping address data from API using userId from localStorage
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/users/get-shipping-address/${userId}`);
        setShippingAddress(response.data.shippingAddress);
      } catch (error) {
        setError('Error fetching shipping address');
        console.error(error);
      }
    };

    fetchShippingAddress();
  }, [navigate]);  // Use navigate in the dependency array

  // Check if there was an error or the address is still being fetched
  if (error) {
    return <div>{error}</div>;
  }

  if (!shippingAddress) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shipping-address-container">
      <h3>Shipping Address</h3>
      <div className="address-row">
        <div className="address-field">
          <strong>Full Name:</strong> {shippingAddress.fullName}
        </div>
        <div className="address-field">
          <strong>Email:</strong> {shippingAddress.email}
        </div>
      </div>
      <div className="address-row">
        <div className="address-field">
          <strong>Phone:</strong> {shippingAddress.phone}
        </div>
        <div className="address-field">
          <strong>Address Line 1:</strong> {shippingAddress.addressLine1}
        </div>
      </div>
      <div className="address-row">
        <div className="address-field">
          <strong>Address Line 2:</strong> {shippingAddress.addressLine2}
        </div>
        <div className="address-field">
          <strong>Area:</strong> {shippingAddress.area}
        </div>
      </div>
      <div className="address-row">
        <div className="address-field">
          <strong>City:</strong> {shippingAddress.city}
        </div>
        <div className="address-field">
          <strong>State:</strong> {shippingAddress.state || 'N/A'}
        </div>
      </div>
      <div className="address-row">
        <div className="address-field">
          <strong>Country:</strong> {shippingAddress.country}
        </div>
        <div className="address-field">
          <strong>Postal Code:</strong> {shippingAddress.postalCode || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
