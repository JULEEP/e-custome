import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { toPng } from 'html-to-image';

const Canva = () => {
  const [shapes, setShapes] = useState([]);
  const [textElements, setTextElements] = useState([]);
  const [canvasBackground, setCanvasBackground] = useState('#fff');

  // Add Text
  const addText = () => {
    const newText = {
      id: Date.now(),
      content: 'Double-click to edit',
      x: 100,
      y: 100,
      fontSize: 16,
      fontFamily: 'Arial',
      color: 'black',
      isEditing: false,
    };
    setTextElements([...textElements, newText]);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const updatedTextElements = textElements.map((text) =>
      text.id === active.id ? { ...text, x: over.x, y: over.y } : text
    );
    setTextElements(updatedTextElements);
  };

  const DraggableText = ({ textElement }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: textElement.id,
    });

    const handleDoubleClick = () => {
      const updatedTextElements = textElements.map((text) =>
        text.id === textElement.id ? { ...text, isEditing: true } : text
      );
      setTextElements(updatedTextElements);
    };

    const handleTextChange = (e) => {
      const updatedTextElements = textElements.map((text) =>
        text.id === textElement.id ? { ...text, content: e.target.value } : text
      );
      setTextElements(updatedTextElements);
    };

    const handleBlur = () => {
      const updatedTextElements = textElements.map((text) =>
        text.id === textElement.id ? { ...text, isEditing: false } : text
      );
      setTextElements(updatedTextElements);
    };

    return (
      <div
        ref={setNodeRef}
        style={{
          position: 'absolute',
          left: textElement.x,
          top: textElement.y,
          fontSize: textElement.fontSize,
          fontFamily: textElement.fontFamily,
          color: textElement.color,
        }}
        {...listeners}
        {...attributes}
        onDoubleClick={handleDoubleClick}
      >
        {textElement.isEditing ? (
          <input
            type="text"
            value={textElement.content}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            style={{
              fontSize: textElement.fontSize,
              fontFamily: textElement.fontFamily,
              color: textElement.color,
            }}
          />
        ) : (
          textElement.content
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px', padding: '10px', background: '#f4f4f4' }}>
        <button onClick={addText}>Add Text</button>
      </div>

      <div
        id="canvas"
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          backgroundColor: canvasBackground,
          border: '1px solid #ccc',
        }}
      >
        {textElements.map((text) => (
          <DraggableText key={text.id} textElement={text} />
        ))}
      </div>
    </div>
  );
};

export default Canva;
