import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import Tesseract from 'tesseract.js';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
    });
    initCanvas.setWidth(window.innerWidth);
    initCanvas.setHeight(window.innerHeight);
    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {

      const img = await fabric.Image.fromURL(e.target.result);

      if (!canvas) return;

      console.log(canvas);


      const scaleFactor = Math.min(
        window.innerWidth / img.width,
        window.innerHeight / img.height
      );

      img.set({
        left: 0,
        top: 0,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        selectable: false,
      });

      canvas.clear();
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      setImageLoaded(true);

      // Perform OCR with Tesseract.js
      Tesseract.recognize(e.target.result, 'eng').then(({ data: { lines } }) => {
        lines.forEach((line) => {
          const { bbox } = line;
          const textBox = new fabric.IText(line.text, {
            left: bbox.x0 * scaleFactor,
            top: bbox.y0 * scaleFactor,
            fontSize: (bbox.y1 - bbox.y0) * scaleFactor,
            fill: '#000',
            editable: true,
          });
          canvas.add(textBox);
        });
      });
    };
    reader.readAsDataURL(file);
  };

  const exportImage = () => {
    if (!canvas || !imageLoaded) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <canvas ref={canvasRef} />
      {imageLoaded && <button onClick={exportImage}>Export Image</button>}
    </div>
  );
};

export default ImageEditor;
