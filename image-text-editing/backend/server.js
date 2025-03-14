const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// API to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// API to process the image (Remove text using blur)
app.post('/edit-image', async (req, res) => {
  const { filename, x, y, width, height } = req.body;

  try {
    const inputPath = path.join(__dirname, 'uploads', filename);
    const outputPath = path.join(__dirname, 'edited', filename);

    await sharp(inputPath)
      .extract({ left: parseInt(x), top: parseInt(y), width: parseInt(width), height: parseInt(height) })
      .blur(10) // Apply blur to remove text
      .toFile(outputPath);

    res.json({ editedImageUrl: `http://localhost:5000/edited/${filename}` });
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed' });
  }
});

// Serve uploaded and edited images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/edited', express.static(path.join(__dirname, 'edited')));

app.listen(5000, () => console.log('Server running on port http://localhost:5000'));
