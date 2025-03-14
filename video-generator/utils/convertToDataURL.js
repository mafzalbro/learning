const fs = require("fs");

const getMimeType = (filePath) => {
  const ext = filePath.split(".").pop().toLowerCase();
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return mimeTypes[ext] || "application/octet-stream"; // Default MIME type
};

const convertToDataURL = (filePath) => {
  
  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return null;
  }

  try {
    const image = fs.readFileSync(filePath); // Read file
    const base64 = image.toString("base64"); // Convert to base64
    const mimeType = getMimeType(filePath); // Get MIME type (e.g., image/png)
    return `data:${mimeType};base64,${base64}`; // Return Data URL
  } catch (error) {
    console.error("❌ Error reading file:", error.message);
    return null;
  }
};

module.exports = { convertToDataURL };
