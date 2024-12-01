import React, { useState } from 'react';
import './CreateOrder.css'
import axios from 'axios';

const CreateOrder = ({ userId }) => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    zipcode: '',
    country: '',
    city: ''
  });

  const [productId, setProductId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post(`https://admin-backend-rl94.onrender.com/api/orders/create-order/${userId}`, {
        paymentMethod,
        shippingAddress,
        productId
      });

      if (response.status === 201) {
        alert('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error placing the order', error);
      alert('Failed to place the order');
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <div>
        <label>Payment Method: </label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Card Payment</option>
        </select>
      </div>

      <h3>Shipping Address</h3>
      <div>
        <label>Full Name: </label>
        <input
          type="text"
          name="fullName"
          value={shippingAddress.fullName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={shippingAddress.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone: </label>
        <input
          type="text"
          name="phone"
          value={shippingAddress.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address Line 1: </label>
        <input
          type="text"
          name="addressLine1"
          value={shippingAddress.addressLine1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address Line 2: </label>
        <input
          type="text"
          name="addressLine2"
          value={shippingAddress.addressLine2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Area: </label>
        <input
          type="text"
          name="area"
          value={shippingAddress.area}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Zip Code: </label>
        <input
          type="text"
          name="zipcode"
          value={shippingAddress.zipcode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Country: </label>
        <input
          type="text"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>City: </label>
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Product ID: </label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleCreateOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CreateOrder;
