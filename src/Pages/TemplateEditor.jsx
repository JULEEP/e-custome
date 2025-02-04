import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TemplateEditor = () => {
  const { productId } = useParams();
  const canvasRef = useRef(null);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [texts, setTexts] = useState([]);
  const [selectedText, setSelectedText] = useState(-1);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Verdana");

  // Fetch templates from API
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
        `https://admin-backend-rl94.onrender.com/api/products/get-templates/${productId}`
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

  // Handle template selection and close popup
  const handleTemplateSelection = (templateUrl) => {
    setSelectedTemplate(templateUrl);
    setShowPopup(false);
    drawCanvas(templateUrl);
  };

  // Add text to the canvas
  const handleSubmitText = () => {
    const textInput = document.getElementById("theText").value;
    if (!textInput) return;

    const newText = {
      text: textInput,
      x: 20,
      y: texts.length * 30 + 20,
      color: textColor,
      fontFamily: fontFamily,
      width: 0,
      height: 0,
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = `16px ${fontFamily}`;
    const textWidth = ctx.measureText(newText.text).width;
    newText.width = textWidth;
    newText.height = 16;

    setTexts((prevTexts) => {
      const updatedTexts = [...prevTexts, newText];
      drawCanvas(selectedTemplate, updatedTexts);
      return updatedTexts;
    });

    document.getElementById("theText").value = "";
  };

  // Handle mouse down event for dragging text
  const handleMouseDown = (e) => {
    const canvasOffset = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasOffset.left;
    const mouseY = e.clientY - canvasOffset.top;

    setStartX(mouseX);
    setStartY(mouseY);

    texts.forEach((text, index) => {
      if (
        mouseX >= text.x &&
        mouseX <= text.x + text.width &&
        mouseY >= text.y - text.height &&
        mouseY <= text.y
      ) {
        setSelectedText(index);
      }
    });
  };

  const handleMouseUp = () => {
    setSelectedText(-1);
  };

  const handleMouseMove = (e) => {
    if (selectedText < 0) return;

    const canvasOffset = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasOffset.left;
    const mouseY = e.clientY - canvasOffset.top;

    const dx = mouseX - startX;
    const dy = mouseY - startY;

    setStartX(mouseX);
    setStartY(mouseY);

    const updatedTexts = [...texts];
    updatedTexts[selectedText].x += dx;
    updatedTexts[selectedText].y += dy;
    setTexts(updatedTexts);
    drawCanvas(selectedTemplate, updatedTexts);
  };

  const drawCanvas = (templateUrl, updatedTexts = texts) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    return new Promise((resolve, reject) => {
      if (templateUrl) {
        const templateImage = new Image();
        templateImage.crossOrigin = "Anonymous"; // Handle cross-origin images
        templateImage.src = templateUrl;

        templateImage.onload = () => {
          const imgWidth = templateImage.width;
          const imgHeight = templateImage.height;

          // Set the canvas dimensions to match the image
          canvas.width = imgWidth;
          canvas.height = imgHeight;

          // Draw the image
          ctx.drawImage(templateImage, 0, 0, imgWidth, imgHeight);

          // Draw the text
          updatedTexts.forEach((text) => {
            ctx.fillStyle = text.color;
            ctx.font = `16px ${text.fontFamily}`;
            ctx.fillText(text.text, text.x, text.y);
          });

          // Resolve after everything is drawn
          resolve();
        };

        templateImage.onerror = (err) => {
          reject(new Error("Failed to load template image"));
        };
      } else {
        reject(new Error("No template URL provided"));
      }
    });
  };

  const handleSave = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        alert("Canvas is not available");
        return;
      }

      const templateUrl = selectedTemplate;
      if (!templateUrl) {
        alert("No template selected");
        return;
      }

      // Ensure the canvas is fully rendered before saving
      await drawCanvas(templateUrl);

      // Convert canvas content to base64 PNG
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Base64 Image Data: ", dataUrl); // Log base64 image data to check if it's correct

      // Prepare the data for saving
      const requestData = {
        image: dataUrl, // Send base64 image data
        productId: productId,
      };

      console.log("Request Data: ", requestData); // Log the data being sent

      // Send the data to the backend API
      const response = await axios.post(
        "https://admin-backend-rl94.onrender.com/api/products/save-template",
        requestData
      );

      if (response.data.success) {
        alert("Template saved successfully!");
      } else {
        alert(`Failed to save template: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving template:", error);
      alert(`An error occurred while saving the template: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1 style={styles.heading}>Template Editor</h1>
        <button style={styles.fetchButton} onClick={fetchTemplates}>
          Fetch Templates
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

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

        <div style={styles.customizeTextContainer}>
          <label style={styles.label}>Text Color:</label>
          <input
            style={styles.colorPicker}
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <label style={styles.label}>Font Family:</label>
          <select
            style={styles.fontSelect}
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Verdana">Verdana</option>
            <option value="Arial">Arial</option>
            <option value="Courier">Courier</option>
          </select>
        </div>
        <input
          id="theText"
          style={styles.textInput}
          type="text"
          placeholder="Enter your text"
        />
        <button
          style={styles.textButton}
          id="submit"
          onClick={handleSubmitText}
        >
          Draw text on canvas
        </button>
        <button onClick={handleSave} style={styles.saveButton}>Save Template</button>
      </div>

      <div style={styles.rightPanel}>
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          style={styles.canvas}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        ></canvas>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "20px",
    textAlign: "center",
    flexWrap: "wrap",
    backgroundColor: "#f8f8f8",
  },
  leftPanel: {
    flex: 0.5,
    paddingRight: "20px",
    marginBottom: "20px",
    minWidth: "300px",
    maxWidth: "350px",
  },
  rightPanel: {
    flex: 0.5,
    minWidth: "350px",
    maxWidth: "500px",
    marginBottom: "20px",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  fetchButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  },
  textInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "14px",
  },
  textButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  customizeTextContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    color: "#333",
  },
  colorPicker: {
    width: "40px",
    height: "40px",
    border: "none",
    cursor: "pointer",
  },
  fontSelect: {
    padding: "5px 10px",
    fontSize: "14px",
    borderRadius: "5px",
  },
  canvas: {
    border: "2px solid #000",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    width: "80%",
    maxWidth: "500px",
  },
  templateGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
  },
  templateCard: {
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  templateImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  selectedTemplateContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  selectedTemplate: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};

export default TemplateEditor;
