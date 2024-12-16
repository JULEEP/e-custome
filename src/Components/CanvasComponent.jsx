import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { FaTextWidth, FaImage, FaBrush, FaPalette, FaSave, FaPuzzlePiece } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const CanvasComponent = () => {
  const canvasRef = useRef(null); // Ref for the canvas DOM element
  const [canvas, setCanvas] = useState(null); // Fabric canvas instance
  const [savedDesign, setSavedDesign] = useState(null);
  const [textColor, setTextColor] = useState('black');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(30);
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextFormOpen, setIsTextFormOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [newText, setNewText] = useState('');
  const { state } = useLocation();
  const { product } = state || {}; // Get the product from the location state
  const navigate = useNavigate();

  // State for the design upload form
  const [designFile, setDesignFile] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f3f3f3',
    });
    setCanvas(initCanvas);

    return () => initCanvas.dispose();
  }, []);

  useEffect(() => {
    const templateUrls = [
      'https://rendering.mcp.cimpress.com/v2/vp/preview?width=412&category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3Dtrue%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-YN48WWE9%252F8%252Ftemplates%252Fc6615021..f9c58b2a-e04f-4251-a983-6eb421ba478d%253Fculture%253Den-in%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255BVisiting%2BCards%25255D%253DStandard%2526optionSelections%25255BSize%25255D%253DStandard%2B%25252889%2Bx%2B51%2Bmm%252529%2526optionSelections%25255BStock%25255D%253DStandard%2BGlossy%2526optionSelections%25255BCut%2BShape%2BType%25255D%253DRectangle%2526optionSelections%25255BFinish%25255D%253DNone%2526optionSelections%25255BBackside%25255D%253DBlank%2526optionSelections%25255BProduct%2BOrientation%25255D%253DHorizontal&merchant_metadata=c6615021..f9c58b2a-e04f-4251-a983-6eb421ba478d&scene=https%3A%2F%2Fscenes.documents.cimpress.io%2Fv3%2Fscenes%3Agenerate%3Fdata%3DlY9Ba4QwFIT%252FSplzEN1V0PyBXnoobG9lD9kkaKgmkjzZtZL%252FXozS7dJLe3nMGzLzviy4GkUdeH0oGTpt2o7Ay%252FrAEHpH4AtG0WrwgmEQ4WM1aB41OMibATEySGdJ39Lb0AnlrquSrnd%252BFR48Z2jTvKQpwIsqjwzCtr1OljKBhJXbEsznKrK8WNtH79QkU%252FuOiiYrGjngzosqO9bJCdMlkBekf4CeSFglvHp67l0IMyLb2BOlJTf5AP6%252BQPYuaAVOftIMgYSnV2dsOn0DR54VVToy35f9%252B27yJ90O2tJWtV9%252BMVa%252FOTBoqx6qmiwvf1VF9s9glR2Ofw0%252BwH8Hz%252FEcY%252FwC&showerr=true&bgcolor=f3f3f3',
    ];
    setTemplates(templateUrls);
  }, []);

  const loadTemplate = (url) => {
    if (!canvas) return;
    
    fabric.Image.fromURL(url, (img) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      const scaleX = canvasWidth / img.width;
      const scaleY = canvasHeight / img.height;

      const scale = Math.min(scaleX, scaleY);

      img.scale(scale);
      img.set({
        left: 50,
        top: 50,
      });

      canvas.clear();
      canvas.add(img);
      canvas.sendToBack(img);
      canvas.renderAll();
    });
  };

  const addText = () => {
    const text = new fabric.Textbox('Editable Text', {
      left: 50,
      top: 50,
      fill: textColor,
      fontSize,
      fontFamily: selectedFont,
    });
    text.on('selected', () => {
      setSelectedText(text);
      setNewText(text.text);
      setIsTextFormOpen(true);
    });
    canvas.add(text);
    canvas.bringToFront(text);
  };

  const addLogo = () => {
    const logoUrl = 'https://your-logo-url.com/logo.png'; 
    fabric.Image.fromURL(logoUrl, (img) => {
      img.set({
        left: 100,
        top: 100,
        selectable: true,
      });
      canvas.add(img);
      canvas.bringToFront(img);
    });
  };

  const saveDesign = () => {
    setSavedDesign(canvas.toDataURL());
  };

  const handleSaveText = () => {
    if (selectedText) {
      selectedText.set({ text: newText });
      canvas.renderAll();
      setIsTextFormOpen(false);
      canvas.bringToFront(selectedText);
    }
  };

  // Handle the form submission (for the design upload form)
  const handleDesignUpload = () => {
    // This is where you'd handle the design and description submission logic
    console.log('Design File:', designFile);
    console.log('Description:', description);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Sidebar for Icons */}
      <div
        style={{
          position: 'fixed',
          top: '90px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        <div onClick={addText} style={{ textAlign: 'center' }}>
          <FaTextWidth size={30} />
          <div>Text</div>
        </div>
        <div onClick={addLogo} style={{ textAlign: 'center' }}>
          <FaImage size={30} />
          <div>Image</div>
        </div>
        <div onClick={saveDesign} style={{ textAlign: 'center' }}>
          <FaSave size={30} />
          <div>Save</div>
        </div>
        <div onClick={() => setIsModalOpen(true)} style={{ textAlign: 'center' }}>
          <FaPuzzlePiece size={30} />
          <div>Change Template</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{ marginTop: '10px', width: '30px', height: '30px', border: 'none', cursor: 'pointer' }}
          />
          <div>Color</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <input
            type="number"
            placeholder="Font Size"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            style={{ marginTop: '10px', width: '50px' }}
          />
          <div>Size</div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ marginLeft: '150px', flex: 1 }}>
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc', width: '100%', height: '100%' }} />
      </div>

      <div
  style={{
    position: 'fixed',
    right: '20px',
    top: '120px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  }}
>
  <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }}>Upload Your Design</h3>

  {/* File Upload */}
  <input
    type="file"
    onChange={(e) => setDesignFile(e.target.files[0])}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      backgroundColor: '#f9f9f9',
      cursor: 'pointer',
      fontSize: '14px',
    }}
  />

  {/* Description Input */}
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter Description"
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      backgroundColor: '#f9f9f9',
      fontSize: '14px',
      minHeight: '80px',
      resize: 'vertical',
    }}
  />

  {/* Submit Button */}
  <button
    onClick={handleDesignUpload}
    style={{
      padding: '12px 0',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
  >
    Send
  </button>
</div>

      {/* Template Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              margin: '10% auto',
              backgroundColor: '#fff',
              padding: '20px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Choose a Template</h3>
            {templates.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Template"
                style={{ width: '100%', cursor: 'pointer', marginBottom: '10px' }}
                onClick={() => {
                  loadTemplate(url);
                  setIsModalOpen(false);
                }}
              />
            ))}
            <button onClick={() => setIsModalOpen(false)} style={{ padding: '5px 10px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Text Edit Form */}
      {isTextFormOpen && selectedText && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
          }}
        >
          <h3>Edit Text</h3>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
          <button
            onClick={handleSaveText}
            style={{
              padding: '5px 10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
