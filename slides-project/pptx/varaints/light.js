const pptxgen = require("pptxgenjs");
const fs = require("fs");
const addRandomShapes = require("../../utils/addRandomShapes");
const choose = require("../../utils/choose");
const htmlToPlainText = require("../../utils/htmlToPlainText");

const createLightPPTX = (path, mainDir) => {
    const pptxFileName = path?.split("/")?.at(-1)?.split(".json")[0]?.toLowerCase()?.split(" ")?.join("_");
    const subDir = `./pptx/slides/${mainDir}`
    const pttxFullPath = `${subDir}/${pptxFileName}_presentation.pptx`

    if (fs.existsSync(pttxFullPath)) {
        console.log(pptxFileName, "PPTX Already Done!!!");
        return;
    }

    if (!fs.existsSync(path)) {
        return { message: "JSON is empty", json: [] };
    }

    if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true })
    }

    // 1. Create a new Presentation
    let pres = new pptxgen();

    // 2. Loop through the JSON data and create slides
    jsonString = fs.readFileSync(path, "utf-8");
    const jsonData = JSON.parse(jsonString)
    console.log({ len: jsonData.length });

    // Define a modern, professional theme palette
    const themeColors = {
        background: { color: "#ffffff" },           // Clean white background
        overlay: { type: "solid", color: "#aaaaaa", transparency: 40 }, // Black overlay at 40% transparency
        overlay2: { type: "solid", color: "#dddddd", transparency: 40 }, // Black overlay at 40% transparency
        titleColor: "#d6336c",                      // Elegant deep pink accent for titles
        textColor: "#333333",                       // Dark gray for readability
        accentColor: "#d6336c",                     // Accent color for decorative elements
    };

    // Function to adjust font size for long titles
    function getDynamicFontSize(text, maxLength) {
        return text.length > maxLength ? 24 : 28;
    }

    // Loop through JSON data to dynamically add slides
    jsonData.forEach((slideData, index) => {
        let slide = pres.addSlide();



        if (index === 0) {
            slide.background = { path: "./images/light3.png" };
        } else {
            // Set the slide background
            slide.background = themeColors.background;
            // Add a full-slide overlay for better text readability
            slide.addShape(pres.ShapeType.rect, {
                x: 0, y: 0, w: "50%", h: "100%",
                fill: choose(themeColors.overlay, themeColors.overlay2, 1),
                // line: { color: "FFFFFF", width: 0 } // No border
            });

            // Add a full-slide overlay for better text readability
            slide.addShape(pres.ShapeType.rect, {
                x: "50%", y: 0, w: "50%", h: "100%",
                fill: choose(themeColors.overlay, themeColors.overlay2, 2),
                // line: { color: "FFFFFF", width: 0 } // No border
            });
        }

        // Add an image on the right side for visual interest
        // slide.addImage({
        //     path: "./images/logo.png",
        //     x: "65%", y: "10%", w: "30%", h: "30%"
        // });

        // Add a subtle accent line at the top for a professional touch
        slide.addShape(pres.ShapeType.rect, {
            x: 0.5, y: "5%", w: "90%", h: 0.03,
            fill: { color: themeColors.accentColor }
        });

        // Add a subtle accent line at the top for a professional touch
        slide.addShape(pres.ShapeType.rect, {
            x: 0.5, y: "95%", w: "90%", h: 0.03,
            fill: { color: themeColors.accentColor }
        });


        addRandomShapes(pres, slide);

        // Determine dynamic font size for the title
        let titleFontSize = getDynamicFontSize(slideData.title, 30);

        // Add the title text, centered at the top
        slide.addText(slideData.title, {
            x: "5%", y: index === 0 ? 0.6 : 0.5, w: "90%", h: 1,
            fontSize: index === 0 ? 32 : titleFontSize,
            fontFace: "Montserrat",
            color: themeColors.titleColor,
            bold: true,
            align: "center",
            valign: "middle",
        });

        // Convert HTML content to plain text
        let contentText = htmlToPlainText(slideData.content);

        // Add the content text box below the title with proper wrapping
        slide.addText(contentText, {
            x: "5%", y: 1.8, w: "90%", h: "60%",
            fontSize: 12,
            fontFace: "Poppins",
            color: themeColors.textColor,
            align: "left",
            valign: "center",
            lineSpacing: 14,
            shrinkText: true, // Prevents overflow
        });



        // Add a small slide number at the bottom-right corner
        slide.addText(`${index + 1}`, {
            x: "90%", y: "90%",
            fontSize: 14,
            fontFace: "Courier New",
            color: themeColors.titleColor,
            align: "left"
        });
    });

    // Save the Presentation
    const pptxResult = pres.writeFile({ fileName: pttxFullPath });
    if (pptxResult) {
        console.log(`${pptxFileName}_presentation.pptx saved`);
    }
}

module.exports = createLightPPTX