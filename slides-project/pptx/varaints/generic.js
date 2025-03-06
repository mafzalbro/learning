const pptxgen = require("pptxgenjs");
const data = require("../../results/data.json");
const htmlToPlainText = require("../../utils/htmlToPlainText");
const jsonData = data;

// 1. Create a new Presentation
let pres = new pptxgen();

// 2. Define theme and colors
const themeColors = {
    backgroundGradient: { color: "#FF3399" },
    titleColor: "#fdff8c", // Gold
    textColor: "#FFFFFF",  // White
    accentColor: "#FF4081", // Pink Accent
    shapeColor: "#FF4081" // Semi-transparent white with opacity
};

// 3. Function to Adjust Font Size for Large Headings
function getDynamicFontSize(text, maxLength) {
    if (text.length > maxLength) {
        return 24; // Smaller font size for long titles
    }
    return 28; // Default font size
}

// 4. Add slides dynamically
jsonData.forEach((slideData, index) => {
    let slide = pres.addSlide();

    // Background gradient
    slide.background = themeColors.backgroundGradient;

    // Add a semi-transparent overlay rectangle for better readability
    slide.addShape(pres.ShapeType.rect, {
        x: 0.2, y: 0.2, w: "90%", h: "90%", fill: { color: themeColors.shapeColor }
    });

    // Add an image (adjust positioning)
    slide.addImage({ path: "./images/dummy.png", x: "70%", y: "10%", w: "25%", h: "25%" });

    // Determine heading font size dynamically
    let headingFontSize = getDynamicFontSize(slideData.title, 30);

    // Add the title with proper spacing
    slide.addText(slideData.title, {
        x: 0.5, y: 1, h: 1, fontSize: headingFontSize, fontFace: "Montserrat",
        color: themeColors.titleColor, bold: true, isTextBox: true, align: "center"
    });

    // Convert HTML content to plain text
    let contentText = htmlToPlainText(slideData.content);

    // Add the content to the slide with wrapping
    slide.addText(contentText, {
        x: 0.5, y: 2.5, w: "85%", h: "50%", fontSize: 12, fontFace: "Poppins",
        color: themeColors.textColor, isTextBox: true, valign: "top",
        lineSpacing: 12, shrinkText: true // Ensures text does not overflow
    });

    // Add a stylish bottom accent line
    slide.addShape(pres.ShapeType.rect, {
        x: 0.5, y: "85%", w: "80%", h: 0.1, fill: { color: themeColors.accentColor }
    });

    // Add slide number with an elegant font
    slide.addText(`#${index + 1}`, {
        x: "90%", y: "90%", fontSize: 18, fontFace: "Courier New", color: themeColors.titleColor, italic: true
    });
});

// 5. Save the Presentation
pres.writeFile({ fileName: "computer_science_presentation.pptx" });
