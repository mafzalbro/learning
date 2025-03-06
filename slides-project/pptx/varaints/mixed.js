const pptxgen = require("pptxgenjs");
const htmlToPlainText = require("../../utils/htmlToPlainText");
const addRandomShapes = require("../../utils/addRandomShapes");
const designVariants = require("./designVariants");
const fs = require("fs");

const createMixedPPTX = (path, mainDir) => {
    const pptxFileName = path?.split("/")?.at(-1)?.split(".json")[0]?.toLowerCase()?.split(" ")?.join("_");
    const subDir = `./pptx/slides/${mainDir}`
    const pttxFullPath = `${subDir}/${pptxFileName}_presentation.pptx`

    if (fs.existsSync(pttxFullPath)) {
        console.log(pptxFileName, "PPTX Already Done!!!");
        return;
    }

    if (!fs.existsSync(path)) {
        return { message: "JSON doesn't exist!!!", json: [] };
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


    function applyRandomDesign(slide, slideData, designVariants) {
        // Pick a random design variant
        const variant = designVariants[Math.floor(Math.random() * designVariants.length)];

        // Set background
        slide.background = variant.background;

        // Add overlay if defined
        if (variant.overlay) {
            // Add main image if provided in slideData (or use default from variant)
            if (slideData.imagePath || variant.image) {
                slide.addImage({
                    path: slideData.imagePath || variant.image.path || "./images/dummy.png",
                    x: variant.image.x,
                    y: variant.image.y,
                    w: variant.image.w,
                    h: variant.image.h
                });
            }

            slide.addShape(pres.ShapeType.rect, {
                x: variant.overlay.x,
                y: variant.overlay.y,
                w: variant.overlay.w,
                h: variant.overlay.h,
                fill: variant.overlay.fill,
                line: variant.overlay.line || { color: "FFFFFF", width: 0 }
            });

        }

        addRandomShapes(pres, slide);

        // Add title using font from JSON if provided, otherwise from variant
        slide.addText(slideData.title, {
            x: variant.title.x,
            y: variant.title.y,
            w: variant.title.w,
            h: variant.title.h,
            fontSize: variant.title.fontSize,
            // Use JSON font if exists; otherwise use variant's font
            fontFace: slideData.titleFontFace || variant.title.fontFace,
            color: variant.title.color,
            bold: variant.title.bold,
            align: variant.title.align,
            valign: variant.title.valign
        });

        // Convert HTML content to plain text
        const contentText = htmlToPlainText(slideData.content);

        // Add content text using JSON font if provided
        slide.addText(contentText, {
            x: variant.content.x,
            y: variant.content.y,
            w: variant.content.w,
            h: variant.content.h,
            fontSize: variant.content.fontSize,
            fontFace: slideData.contentFontFace || variant.content.fontFace,
            color: variant.content.color,
            align: variant.content.align,
            valign: variant.content.valign,
            lineSpacing: variant.content.lineSpacing,
            shrinkText: variant.content.shrinkText
        });


        // Add a corner image that is half off-slide if defined
        if (variant.cornerImage) {
            slide.addImage({
                path: variant.cornerImage.path || "./images/logo.png",
                x: variant.cornerImage.x,
                y: variant.cornerImage.y,
                w: variant.cornerImage.w,
                h: variant.cornerImage.h
            });
        }

        // Add slide number if defined in the variant
        if (variant.slideNumber) {
            slide.addText(`${slideData.slideNumber || ""}`, {
                x: variant.slideNumber.x,
                y: variant.slideNumber.y,
                fontSize: variant.slideNumber.fontSize,
                fontFace: variant.slideNumber.fontFace,
                color: variant.slideNumber.color,
                // align: variant.slideNumber.align
            });
        }

        // Add decorative shapes if any
        if (variant.shapes && Array.isArray(variant.shapes)) {
            variant.shapes.forEach(shape => {
                slide.addShape(shape.type, {
                    x: shape.x,
                    y: shape.y,
                    w: shape.w,
                    h: shape.h,
                    fill: shape.fill,
                    line: shape.line
                });
            });
        }
    }


    // Loop through each JSON data item to create slides with random designs
    jsonData.forEach((slideData, index) => {
        let slide = pres.addSlide();
        // Add a slide number property
        slideData.slideNumber = index + 1;
        // Apply a random design variant to the slide
        applyRandomDesign(slide, slideData, designVariants);
    });

    // Save the Presentation
    const pptxResult = pres.writeFile({ fileName: pttxFullPath });
    if (pptxResult) {
        console.log(`${pptxFileName}_presentation.pptx saved`);
    }
}

module.exports = createMixedPPTX