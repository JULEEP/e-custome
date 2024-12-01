import React, { useState } from "react";
import { TextField, MenuItem, Select, Button, InputLabel, FormControl, CircularProgress, Snackbar } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai"; // Import from react-icons
import axios from "axios";
import "./CreateProduct.css"; // Ensure you have the correct CSS file for styling

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discountPercentage: "",
    brand: "",
    bulletPoint: "",
    modelNumber: "",
    style: "",
    numberOfItems: "",
    itemTypeName: "",
    numberOfPieces: "",
    productBenefits: "",
    color: "",
    size: "",
    available: true,
    image: null, // Store selected image file
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const categories = [
    "Visiting Cards",
    "Stationery, Letterheads & Notebooks",
    "Personalised Pens",
    "Stamps and Ink",
    "Signs, Posters & Marketing Materials",
    "Labels, Stickers & Packaging",
    "Clothing, Caps & Bags",
    "Mugs, Albums & Gifts",
    "Calendars, Notebooks & Diaries",
    "Custom Winter Wear",
    "Bulk Orders",
  ];

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value, // Update the corresponding form field value
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Single file selected
    setProductData({
      ...productData,
      image: file ? [file] : [], // Make sure it's an array, even if it's just one image
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare FormData to send to the server
    const formData = new FormData();
  
    // Append form data fields
    for (const key in productData) {
      if (key === "image" && productData.image) {
        // Append images as an array
        productData.image.forEach((file) => formData.append("images", file)); // 'images' matches the backend
      } else {
        formData.append(key, productData[key]);
      }
    }
  
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
  
      // Make the API call to create the product
      const response = await axios.post(
        "https://admin-backend-rl94.onrender.com/api/products/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
  
      setLoading(false);
      setSuccessMessage(response.data.message);
      setOpenSnackbar(true); // Show Snackbar popup
  
      // Clear the form after successful submission
      setProductData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        discountPercentage: "",
        brand: "",
        bulletPoint: "",
        modelNumber: "",
        style: "",
        numberOfItems: "",
        itemTypeName: "",
        numberOfPieces: "",
        productBenefits: "",
        color: "",
        size: "",
        available: true,
        image: null,
      });
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.error : "An error occurred");
    }
  };  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form className="create-product-form" onSubmit={handleSubmit}>
        {/* Product Title */}
        <TextField
          label="Product Title"
          variant="outlined"
          fullWidth
          name="title"
          value={productData.title}
          onChange={handleChange}
          className="form-field"
        />

        {/* Product Description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="form-field"
        />

        {/* Product Price */}
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="form-field"
        />

        {/* Category Select */}
        <FormControl fullWidth className="form-field">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={productData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Stock */}
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          className="form-field"
        />

        {/* Discount Percentage */}
        <TextField
          label="Discount Percentage"
          variant="outlined"
          fullWidth
          type="number"
          name="discountPercentage"
          value={productData.discountPercentage}
          onChange={handleChange}
          className="form-field"
        />

        {/* Brand */}
        <TextField
          label="Brand"
          variant="outlined"
          fullWidth
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          className="form-field"
        />

        {/* Bullet Point */}
        <TextField
          label="Bullet Point"
          variant="outlined"
          fullWidth
          name="bulletPoint"
          value={productData.bulletPoint}
          onChange={handleChange}
          className="form-field"
        />

        {/* Model Number */}
        <TextField
          label="Model Number"
          variant="outlined"
          fullWidth
          name="modelNumber"
          value={productData.modelNumber}
          onChange={handleChange}
          className="form-field"
        />

        {/* Style */}
        <TextField
          label="Style"
          variant="outlined"
          fullWidth
          name="style"
          value={productData.style}
          onChange={handleChange}
          className="form-field"
        />

        {/* Number of Items */}
        <TextField
          label="Number of Items"
          variant="outlined"
          fullWidth
          name="numberOfItems"
          value={productData.numberOfItems}
          onChange={handleChange}
          className="form-field"
        />

        {/* Item Type Name */}
        <TextField
          label="Item Type Name"
          variant="outlined"
          fullWidth
          name="itemTypeName"
          value={productData.itemTypeName}
          onChange={handleChange}
          className="form-field"
        />

        {/* Number of Pieces */}
        <TextField
          label="Number of Pieces"
          variant="outlined"
          fullWidth
          name="numberOfPieces"
          value={productData.numberOfPieces}
          onChange={handleChange}
          className="form-field"
        />

        {/* Product Benefits */}
        <TextField
          label="Product Benefits"
          variant="outlined"
          fullWidth
          name="productBenefits"
          value={productData.productBenefits}
          onChange={handleChange}
          className="form-field"
        />

        {/* Color */}
        <TextField
          label="Color"
          variant="outlined"
          fullWidth
          name="color"
          value={productData.color}
          onChange={handleChange}
          className="form-field"
        />

        {/* Size */}
        <TextField
          label="Size"
          variant="outlined"
          fullWidth
          name="size"
          value={productData.size}
          onChange={handleChange}
          className="form-field"
        />

        {/* Product Availability */}
        <FormControl fullWidth className="form-field">
          <InputLabel>Available</InputLabel>
          <Select
            name="available"
            value={productData.available}
            onChange={handleChange}
            label="Available"
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        {/* Product Image Upload */}
        <div className="image-upload">
          <Button
            variant="contained"
            component="label"
            startIcon={<AiOutlineCloudUpload />}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {productData.image && <p>Image: {productData.image[0].name}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create Product"}
        </Button>
      </form>

      {/* Display Success or Error */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Snackbar Popup for Success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Your product has been created successfully!"
      />
    </div>
  );
};

export default CreateProduct;
