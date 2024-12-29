import React, { useState } from "react";
import axios from "axios";

const TemplateEditor = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nameText: "",
    month: "",
    year: "",
    contactNumber: "",
    logoImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch templates from the backend
  const fetchTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/products/get-templates"
      );
      if (response.data.success) {
        setTemplates(response.data.templates);
        setShowPopup(true); // Open the popup on successful fetch
      } else {
        setError(response.data.message || "Failed to fetch templates");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching templates");
    } finally {
      setLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateSelection = (templateUrl) => {
    setSelectedTemplate(templateUrl);
    setShowPopup(false); // Automatically close the popup
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    setFormData({ ...formData, logoImage: e.target.files[0] });
  };

  // Submit overlay data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formDataObj = new FormData();
    formDataObj.append("templateUrl", selectedTemplate);  // Send the selected template URL
    formDataObj.append("nameText", formData.nameText);
    formDataObj.append("month", formData.month);
    formDataObj.append("year", formData.year);
    formDataObj.append("contactNumber", formData.contactNumber);
    if (formData.logoImage) {
      formDataObj.append("logoImage", formData.logoImage); // Send the logo image if exists
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/upload",
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setSelectedTemplate(response.data.product.images[0]); // Update with the new image URL after overlay
        setEditMode(false); // Close the edit form
      } else {
        setError(response.data.message || "Failed to apply overlays");
      }
    } catch (err) {
      setError(err.message || "An error occurred while applying overlays");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Template Editor</h1>
      <button
        onClick={fetchTemplates}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Fetch Templates
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Popup for template selection */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFF",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            zIndex: 1000,
          }}
        >
          <h2>Select a Template</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {templates.map((template) => (
              <div
                key={template._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  cursor: "pointer",
                  width: "150px",
                }}
                onClick={() => handleTemplateSelection(template.url)}
              >
                <img
                  src={template.url}
                  alt="Template"
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected template display */}
      {selectedTemplate && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ flex: 1, padding: "20px" }}>
            <button
              onClick={() => setEditMode(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit Template
            </button>
          </div>
          <div style={{ flex: 2 }}>
            <img
              src={selectedTemplate}
              alt="Selected Template"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editMode && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFF",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            zIndex: 1000,
          }}
        >
          <h2>Edit Template</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nameText"
              placeholder="Name"
              value={formData.nameText}
              onChange={handleInputChange}
              required
              style={{ display: "block", margin: "10px 0", width: "100%" }}
            />
            <input
              type="text"
              name="month"
              placeholder="Month"
              value={formData.month}
              onChange={handleInputChange}
              style={{ display: "block", margin: "10px 0", width: "100%" }}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleInputChange}
              style={{ display: "block", margin: "10px 0", width: "100%" }}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              style={{ display: "block", margin: "10px 0", width: "100%" }}
            />
            <input
              type="file"
              name="logoImage"
              onChange={handleLogoUpload}
              style={{ display: "block", margin: "10px 0" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TemplateEditor;
