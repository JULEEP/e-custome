import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';  // Import the pen icon
import './UserDetails.css';  // Import the CSS file for styling

const UserDetails = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);  // State to store user data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // State for opening modal
  const [updatedUser, setUpdatedUser] = useState({});  // State to manage updated data

  // Fetch user data on component mount
  useEffect(() => {
    if (!userId) {
      setError('User ID is missing!');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input field changes inside the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://admin-backend-rl94.onrender.com/api/users/update-user/${userId}`, updatedUser);
      setUser(response.data);  // Update the UI with the updated user data
      setIsEditModalOpen(false);  // Close the modal after update
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  // Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-details-container">
      {user && (
        <div className="user-card">
          <h2>User Details</h2>
          <form className="user-info-form">
            <div className="info-row">
              <div className="half-field">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  value={user.fullName}
                  readOnly
                />
              </div>
              <div className="half-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            <div className="info-row">
              <div className="half-field">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={user.phoneNumber}
                  readOnly
                />
              </div>
              <div className="half-field">
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  id="status"
                  value={user.Status}
                  readOnly
                />
              </div>
            </div>
          </form>

          {/* Pen Icon for Editing */}
          <FaPen className="edit-icon" onClick={() => setIsEditModalOpen(true)} />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="info-row">
                <div className="half-field">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={updatedUser.fullName || user.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="half-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email || user.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="info-row">
                <div className="half-field">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={updatedUser.phoneNumber || user.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="half-field">
                  <label htmlFor="status">Status:</label>
                  <input
                    type="text"
                    name="status"
                    value={updatedUser.Status || user.Status}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button type="submit">Update</button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
