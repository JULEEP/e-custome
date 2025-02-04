import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Template = () => {
  const [texts, setTexts] = useState([]); // Store all text objects
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1);
  const [inputText, setInputText] = useState("");
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const backgroundLoaded = useRef(false); // Track if image is loaded

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    // Load background image
    const img = new Image();
    img.src =
      "https://res.cloudinary.com/dokfnv3vy/raw/upload/v1738572543/templates/p7o8ci4qa3uaogqmgxpd";
    img.onload = () => {
      imageRef.current = img;
      backgroundLoaded.current = true; // Mark as loaded
      drawCanvas();
    };
  }, []);

  useEffect(() => {
    if (backgroundLoaded.current) drawCanvas();
  }, [texts]);

  const drawCanvas = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }

    // Draw text
    texts.forEach((text) => {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(text.text, text.x, text.y);
    });
  };

  const addText = () => {
    if (!inputText.trim()) return;
    const newText = { text: inputText, x: 50, y: 50 };
    setTexts([...texts, newText]);
    setInputText(""); // Clear input
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedIndex = texts.findIndex(
      (text) =>
        mouseX >= text.x &&
        mouseX <= text.x + ctxRef.current.measureText(text.text).width &&
        mouseY >= text.y - 20 &&
        mouseY <= text.y
    );

    if (clickedIndex !== -1) {
      setSelectedTextIndex(clickedIndex);
      offsetRef.current = {
        x: mouseX - texts[clickedIndex].x,
        y: mouseY - texts[clickedIndex].y,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (selectedTextIndex === -1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const updatedTexts = [...texts];
    updatedTexts[selectedTextIndex].x = mouseX - offsetRef.current.x;
    updatedTexts[selectedTextIndex].y = mouseY - offsetRef.current.y;

    setTexts(updatedTexts);
  };

  const handleMouseUp = () => {
    setSelectedTextIndex(-1);
  };

  const downloadPDF = async () => {
    if (!backgroundLoaded.current) {
      alert("Image is still loading! Please wait.");
      return;
    }

    const canvas = await html2canvas(canvasRef.current, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgWidth = 297; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("edited-template.pdf");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Canvas with Background Image</h1>

      {/* Input and Button */}
      <div className="mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="Enter text"
        />
        <button
          onClick={addText}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Add Text
        </button>
        <button
          onClick={downloadPDF}
          className="ml-2 p-2 bg-green-500 text-white rounded-md"
        >
          Download PDF
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-red-500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Template;
