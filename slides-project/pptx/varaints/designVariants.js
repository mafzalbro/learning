const pptxgen = require("pptxgenjs");

let pres = new pptxgen();

// Define the main color and adjust the design based on it
const mainColor = "#dc143c";
const lightTextColor = "#444444";
const darkTextColor = "#ffffff";
const slideNumberColor = "#333333"; // Lighter slide number color
const topLineColor = "#999999"; // Thinner and lighter top line
const slideNumberColorDark = "#aaaaaa"; // Lighter slide number color
const topLineColorDark = "#aaaaaa"; // Thinner and lighter top line

const designVariants = [
    // Dark Theme Variants
    {
        // background: { color: "#263238" },
        background: { path: "images/dark5.png" },
        title: { x: "5%", y: 0.5, w: "90%", h: 1, fontSize: 30, fontFace: "Montserrat", color: mainColor, bold: true, align: "center", valign: "middle" },
        content: { x: "5%", y: 1.8, w: "90%", h: "60%", fontSize: 14, fontFace: "Poppins", color: darkTextColor, align: "left", valign: "center", lineSpacing: 16, shrinkText: true },
        shapes: [{ type: pres.ShapeType.rect, x: "5%", y: "88%", w: "88%", h: 0.03, fill: { color: topLineColorDark } }],
        slideNumber: { x: "90%", y: "93%", fontSize: 12, fontFace: "Courier New", color: slideNumberColorDark, align: "left" }
    },
    {
        background: { path: "images/dark7.png" },
        title: { x: "5%", y: 0.5, w: "90%", h: 1, fontSize: 30, fontFace: "Montserrat", color: mainColor, bold: true, align: "center", valign: "middle" },
        content: { x: "5%", y: 1.8, w: "90%", h: "60%", fontSize: 14, fontFace: "Poppins", color: darkTextColor, align: "left", valign: "center", lineSpacing: 16, shrinkText: true },
        shapes: [{ type: pres.ShapeType.rect, x: "5%", y: "88%", w: "88%", h: 0.03, fill: { color: topLineColorDark } }],
        slideNumber: { x: "90%", y: "93%", fontSize: 12, fontFace: "Courier New", color: slideNumberColorDark, align: "left" }
    },
    // Light Theme Variants
    {
        // background: { color: "#ffffff" },
        background: { path: "images/light3.png" },
        title: { x: "5%", y: 0.5, w: "90%", h: 1, fontSize: 30, fontFace: "Montserrat", color: mainColor, bold: true, align: "center", valign: "middle" },
        content: { x: "5%", y: 1.8, w: "90%", h: "60%", fontSize: 14, fontFace: "Poppins", color: lightTextColor, align: "left", valign: "center", lineSpacing: 16, shrinkText: true },
        shapes: [{ type: pres.ShapeType.rect, x: "5%", y: "88%", w: "88%", h: 0.03, fill: { color: topLineColor } }],
        slideNumber: { x: "90%", y: "93%", fontSize: 12, fontFace: "Courier New", color: slideNumberColor, align: "left" }
    },
    {
        // background: { color: "#f8f9fa" },
        background: { path: "images/light2.png" },
        title: { x: "5%", y: 0.5, w: "90%", h: 1, fontSize: 30, fontFace: "Montserrat", color: mainColor, bold: true, align: "center", valign: "middle" },
        content: { x: "5%", y: 1.8, w: "90%", h: "60%", fontSize: 14, fontFace: "Poppins", color: lightTextColor, align: "justify", valign: "center", lineSpacing: 16, shrinkText: true },
        shapes: [{ type: pres.ShapeType.rect, x: "5%", y: "88%", w: "88%", h: 0.03, fill: { color: topLineColor } }],
        slideNumber: { x: "90%", y: "93%", fontSize: 12, fontFace: "Courier New", color: slideNumberColor, align: "left" }
    },
];

module.exports = designVariants;