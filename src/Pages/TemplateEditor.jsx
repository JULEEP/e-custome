import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TemplateEditor = () => {
  const { productId } = useParams(); // Extract productId from the URL
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nameText: "",
    month: "",
    year: "",
    contactNumber: "",
    hindiText: "",
    logoImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTemplates = async () => {
    setLoading(true);
    setError("");

    if (!productId) {
      setError("Product ID is required to fetch templates.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://admin-backend-rl94.onrender.com/api/products/get-templates/${productId}` // Updated endpoint
      );
      if (response.data.success) {
        setTemplates(response.data.templates);
        setShowPopup(true);
      } else {
        setError(response.data.message || "Failed to fetch templates");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching templates");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelection = (templateUrl) => {
    setSelectedTemplate(templateUrl);
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoUpload = (e) => {
    setFormData({ ...formData, logoImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!productId) {
      setError("Product ID is required to upload template.");
      setLoading(false);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("templateUrl", selectedTemplate);
    formDataObj.append("nameText", formData.nameText);
    formDataObj.append("month", formData.month);
    formDataObj.append("year", formData.year);
    formDataObj.append("contactNumber", formData.contactNumber);
    formDataObj.append("hindiText", formData.hindiText);
    if (formData.logoImage) {
      formDataObj.append("logoImage", formData.logoImage);
    }

    try {
      const response = await axios.post(
        `https://admin-backend-rl94.onrender.com/api/products/upload/${productId}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setSelectedTemplate(response.data.imageUrl);
        setEditMode(false);
        navigate(`/single-product/${productId}`);
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
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1>Template Editor</h1>
        <button onClick={fetchTemplates} style={styles.fetchButton}>
          Fetch Templates
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {selectedTemplate && !editMode && (
          <button
            onClick={() => setEditMode(true)}
            style={styles.editButton}
          >
            Edit Template
          </button>
        )}

        {editMode && (
          <div style={styles.editFormContainer}>
            <h2>Edit Template</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="nameText"
                placeholder="Name"
                value={formData.nameText}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="month"
                placeholder="Month"
                value={formData.month}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                style={styles.input}
              />
              <textarea
                name="hindiText"
                placeholder="Hindi Text"
                value={formData.hindiText}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="file"
                name="logoImage"
                onChange={handleLogoUpload}
                style={styles.input}
              />
              <button type="submit" style={styles.saveButton}>
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      <div style={styles.rightPanel}>
        {showPopup && (
          <div style={styles.popup}>
            <h2>Select a Template</h2>
            <div style={styles.templateGrid}>
              {templates.map((template) => (
                <div
                  key={template._id}
                  style={styles.templateCard}
                  onClick={() => handleTemplateSelection(template.url)}
                >
                  <img
                    src={template.url}
                    alt="Template"
                    style={styles.templateImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTemplate && (
          <div style={styles.selectedTemplateContainer}>
            <img
              src={selectedTemplate}
              alt="Selected Template"
              style={styles.selectedTemplate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    textAlign: "center",
  },
  leftPanel: {
    flex: 1,
    paddingRight: "20px",
    marginBottom: "20px",
  },
  rightPanel: {
    flex: 2,
  },
  fetchButton: {
    padding: "8px 15px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  editButton: {
    padding: "12px 25px",
    backgroundColor: "#28a745",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  editFormContainer: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  saveButton: {
    padding: "12px 25px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    zIndex: 1000,
    width: "80%",
    maxWidth: "600px",
    overflowY: "auto",
  },
  templateGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  templateCard: {
    border: "1px solid #ccc",
    padding: "10px",
    cursor: "pointer",
    width: "150px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  templateImage: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  selectedTemplateContainer: {
    marginTop: "20px",
  },
  selectedTemplate: {
    width: "100%",
    maxHeight: "500px",
    objectFit: "contain",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
};

export default TemplateEditor;
