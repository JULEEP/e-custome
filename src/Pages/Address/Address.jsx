import React, { useState } from "react";
import "./Address.css";

const Address = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address1: "",
    address2: "",
    area: "",
    zipcode: "",
    country: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Address:", formData);
    setFormData({
      fullName: "",
      email: "",
      address1: "",
      address2: "",
      area: "",
      zipcode: "",
      country: "",
      city: "",
      phone: "",
    });
  };

  return (
    <div className="simple-form-container">
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-row">
          <div>
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row full-width">
          <label htmlFor="address1">Address 1*</label>
          <input
            type="text"
            id="address1"
            name="address1"
            required
            value={formData.address1}
            onChange={handleChange}
          />
        </div>

        <div className="form-row full-width">
          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="area">Area*</label>
            <input
              type="text"
              id="area"
              name="area"
              required
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="zipcode">Zipcode*</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              required
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="country">Country*</label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row full-width">
          <label htmlFor="phone">Phone*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Address;
