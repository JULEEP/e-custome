import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useLocation, useNavigate } from 'react-router-dom';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [savedDesign, setSavedDesign] = useState(null); // State to store the saved design
  const [userId, setUserId] = useState(null); // State to store userId
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();

  // Initialize Fabric.js canvas
  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f3f3f3',
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
      setUserId(storedUserId); // Set the userId state
    } else {
      console.log('User not logged in');
    }
  }, []);

  useEffect(() => {
    if (canvas && product && product.images && product.images.length > 0) {
      const imageUrl = product.images[0];
      
      // Attempt to fetch the image with no-cors mode
      fetch(imageUrl, { mode: 'no-cors' })
        .then(response => {
          return response.blob(); // Get the image as a blob
        })
        .then(imageBlob => {
          const imageObjectURL = URL.createObjectURL(imageBlob); // Create a URL for the image blob
  
          // Now load the image onto the canvas
          fabric.Image.fromURL(imageObjectURL, (img) => {
            img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
            canvas.add(img);
            canvas.setActiveObject(img);
          });
        })
        .catch(err => {
          console.error('Error loading image:', err);
        });
    }
  }, [canvas, product]);  
  // Add text to canvas
  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox('Editable Text', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: 'black',
      editable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  // Add image to canvas
  const addImage = (e) => {
    if (!canvas) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(
        event.target.result,
        (img) => {
          img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
          canvas.add(img);
          canvas.setActiveObject(img);
        },
        { crossOrigin: 'anonymous' }
      );
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Delete selected object
  const deleteObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  // Clear the entire canvas
  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
    canvas.setBackgroundColor('#f3f3f3', canvas.renderAll.bind(canvas));
  };

  // Save the canvas as a base64 image
  const saveDesign = () => {
    if (!canvas) return;
    const designData = canvas.toDataURL({ format: 'png' });
    setSavedDesign(designData); // Store the design as base64 image
  };

  const saveAndAddToCart = async () => {
    if (!canvas || !product || !userId) return;
  
    try {
      // Save the design as a base64 image in JPEG format with reduced quality
      const designData = canvas.toDataURL({
        format: 'jpeg', // Use JPEG format for smaller size
        quality: 0.5,   // Adjust quality (0 to 1) for size vs. quality tradeoff
      });
  
      // Prepare the payload for the API
      const payload = {
        productId: product._id, // Assuming `product._id` contains the product ID
        quantity: 1,
        action: 'increment',
        customDesign: designData,
      };
  
      // Make the API call to add the item to the cart
      const response = await fetch(`https://admin-backend-rl94.onrender.com/api/users/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart');
      }
  
      const result = await response.json();
      console.log('Cart updated successfully:', result);
      navigate(`/cart/${userId}`);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };
  
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar with tools */}
      <div
        style={{
          width: '60px',
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
        <button onClick={addText} style={buttonStyle}>
          Add Text
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={addImage}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" style={buttonStyle}>
          Add Image
        </label>
        <button onClick={deleteObject} style={buttonStyle}>
          Delete
        </button>
        <button onClick={clearCanvas} style={buttonStyle}>
          Clear Canvas
        </button>
        <button onClick={saveDesign} style={buttonStyle}>
          Save Design
        </button>
      </div>

      {/* Canvas area */}
      <div style={{ marginLeft: '80px', paddingTop: '20px', flexGrow: 1 }}>
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      </div>

      {/* Save and Add to Cart */}
      <div style={{ marginLeft: '80px', marginRight: '40px', paddingTop: '80px' }}>
        <button onClick={saveAndAddToCart} style={addToCartButtonStyle}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
};

const addToCartButtonStyle = {
  backgroundColor: '#28a745',
  border: 'none',
  color: '#fff',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default CanvasComponent;
