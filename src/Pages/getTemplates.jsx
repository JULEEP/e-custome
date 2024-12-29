import React, { useState } from 'react';
import axios from 'axios';

const TemplateViewer = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch templates from the backend
  const fetchTemplates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:4000/api/products/get-templates');
      if (response.data.success) {
        setTemplates(response.data.templates);
        setShowPopup(true); // Open the popup on successful fetch
      } else {
        setError(response.data.message || 'Failed to fetch templates');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching templates');
    } finally {
      setLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateSelection = (templateUrl) => {
    setSelectedTemplate(templateUrl); // Set selected template
    setShowPopup(false); // Automatically close the popup
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Template Viewer</h1>
      <button
        onClick={fetchTemplates}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Fetch Templates
      </button>

      {loading && <p>Loading templates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Popup for templates */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FFF',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
          }}
        >
          <h2>Select a Template</h2>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            ✖
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {templates.map((template) => (
              <div
                key={template._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '150px',
                }}
                onClick={() => handleTemplateSelection(template.url)} // Close popup and select template
              >
                <img
                  src={template.url}
                  alt="Template"
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <p style={{ marginTop: '10px' }}>ID: {template._id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected template display */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          backgroundColor: '#f9f9f9',
          boxShadow: '-4px 0px 10px rgba(0, 0, 0, 0.25)',
          display: selectedTemplate ? 'block' : 'none',
          padding: '20px',
          overflowY: 'auto',
          zIndex: 999,
        }}
      >
        <h2>Selected Template</h2>
        {selectedTemplate && (
          <img
            src={selectedTemplate}
            alt="Selected Template"
            style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
          />
        )}
      </div>

      {/* Overlay for disabling background interaction */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );
};

export default TemplateViewer;
