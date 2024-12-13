import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useLocation, useNavigate } from 'react-router-dom';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [savedDesign, setSavedDesign] = useState(null);
  const [userId, setUserId] = useState(null);
  const [textColor, setTextColor] = useState('black');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(30);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropBox, setCropBox] = useState(null);
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();

  // Initialize Fabric.js canvas
  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f3f3f3',
      selection: false,
    });
    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log('User not logged in');
    }
  }, []);

  // Predefined template URLs
  useEffect(() => {
    const templateUrls = [
      'https://static.vecteezy.com/system/resources/previews/000/254/814/original/vector-abstract-beautiful-wedding-invitation-card-design.jpg',
    ];
    setTemplates(templateUrls);
  }, []);

  // Load selected template onto the canvas
  const loadTemplate = (templateUrl) => {
    if (!canvas) return;

    fabric.Image.fromURL(templateUrl, (img) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const imgWidth = img.width;
      const imgHeight = img.height;

      const scaleX = canvasWidth / imgWidth;
      const scaleY = canvasHeight / imgHeight;

      const scale = Math.min(scaleX, scaleY);

      img.set({
        left: 0,
        top: 0,
        scaleX: scale,
        scaleY: scale,
        hasControls: true,
        hasBorders: true,
        cornerSize: 20,
      });

      canvas.clear();
      canvas.add(img);
      canvas.setActiveObject(img);
    }, { crossOrigin: 'anonymous' })
    .catch(err => {
      console.error('Error loading template:', err);
      alert('Failed to load template.');
    });
  };

  // Update image size (in pixels)
  const handleResizeChange = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.set) {
      const newWidth = document.getElementById('resizeWidth').value;
      const newHeight = document.getElementById('resizeHeight').value;
      activeObject.set({ width: newWidth, height: newHeight });
      canvas.renderAll();
    }
  };

  // Enable cropping mode
  const startCropping = () => {
    setIsCropping(true);
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.set) {
      const cropBox = new fabric.Rect({
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.width * 0.5,
        height: activeObject.height * 0.5,
        fill: 'rgba(255, 255, 255, 0.5)',
        stroke: 'black',
        strokeWidth: 2,
        hasControls: true,
        lockScalingFlip: true,
      });

      setCropBox(cropBox);
      canvas.add(cropBox);
      canvas.setActiveObject(cropBox);
    }
  };

  // Crop the image to the selected area
  const cropImage = () => {
    if (cropBox && canvas) {
      const activeObject = canvas.getActiveObject();
      const cropArea = cropBox.getBoundingRect();

      const img = canvas.getObjects().find((obj) => obj !== cropBox && obj.type === 'image');
      if (img) {
        img.set({
          clipPath: new fabric.Rect({
            left: cropArea.left,
            top: cropArea.top,
            width: cropArea.width,
            height: cropArea.height,
          }),
        });
        canvas.renderAll();
        setIsCropping(false);
        canvas.remove(cropBox);
      }
    }
  };

  // Save the custom design
  const saveDesign = () => {
    if (!canvas) return;
    const designData = canvas.toDataURL();
    setSavedDesign(designData);
    console.log('Design saved:', designData);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Add text to canvas
  const addText = () => {
    if (!canvas) return;

    // Create the text object
    const text = new fabric.Textbox('Editable Text', {
      left: 100,
      top: 200,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: selectedFont,
    });

    // Add the text to the canvas
    canvas.add(text);

    // Bring the text to the front, ensuring it is above the image
    canvas.bringToFront(text);

    // Render the canvas to apply changes
    canvas.renderAll();
  };

  // Handle text color change
  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({ fill: e.target.value });
      canvas.renderAll();
    }
  };

  // Handle font change
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({ fontFamily: e.target.value });
      canvas.renderAll();
    }
  };

  // Handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({ fontSize: e.target.value });
      canvas.renderAll();
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar with buttons */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#333',
          color: '#fff',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          position: 'fixed',
          height: '100vh',
        }}
      >
        <button onClick={saveDesign} style={buttonStyle}>Save Design</button>

        <button onClick={toggleModal} style={buttonStyle}>Choose Template</button>

        {/* Resize Section */}
        <button onClick={() => setIsResizing(true)} style={buttonStyle}>Resize</button>

        {/* Text Customization Section */}
        <button onClick={addText} style={buttonStyle}>Add Text</button>

        <input
          type="color"
          value={textColor}
          onChange={handleTextColorChange}
          style={inputStyle}
        />
        <select
          value={selectedFont}
          onChange={handleFontChange}
          style={inputStyle}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
        <input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          style={inputStyle}
          placeholder="Font Size"
        />
      </div>

      {/* Canvas Area */}
      <div style={{ marginLeft: '220px', paddingTop: '20px', flexGrow: 1 }}>
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      </div>

      {/* Saved Design Preview */}
      {savedDesign && (
        <div style={{ marginLeft: '220px', marginTop: '20px' }}>
          <h3>Your Saved Design:</h3>
          <img src={savedDesign} alt="Saved Design" />
        </div>
      )}

      {/* Modal for Template Selection */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Select a Template:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {templates.map((template, index) => (
                <div
                  key={index}
                  style={{ margin: '10px', cursor: 'pointer' }}
                  onClick={() => {
                    loadTemplate(template);
                    toggleModal();
                  }}
                >
                  <img
                    src={template}
                    alt={`Template ${index}`}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
            <button onClick={toggleModal} style={buttonStyle}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Button style
const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
  width: '150px',
  textAlign: 'center',
};

// Input style for text settings
const inputStyle = {
  padding: '5px',
  marginTop: '10px',
  borderRadius: '5px',
};

// Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'center',
};

export default CanvasComponent;
