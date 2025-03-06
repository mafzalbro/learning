const pptxgen = require("pptxgenjs");
const cheerio = require("cheerio");
const fs = require("fs");
const addRandomShapes = require("../utils/addRandomShapes");


const createPPTX = (path) => {

    // 1. Create a new Presentation
    let pres = new pptxgen();

    // 2. Loop through the JSON data and create slides
    if (!fs.existsSync(path)) {
        return { message: "JSON is empty", json: [] };
    }
    
    jsonString = fs.readFileSync(path, "utf-8");
    const jsonData = JSON.parse(jsonString)
    console.log({ len: jsonData.length });


    // Function to convert HTML to plain text using Cheerio
    function htmlToPlainText(html) {
        const $ = cheerio.load(html);
        $('ul').each((i, el) => {
            $(el).children('li').each((i, li) => {
                $(li).prepend('• '); // Add bullet point symbol
            });
        });
        return $.text(); // Extracts plain text from the HTML content
    }

    pres.theme = { headFontFace: "Montserrat" };
    pres.theme = { bodyFontFace: "Poppins" };

    // 3. Add slides for each entry in the JSON
    jsonData.forEach((slideData) => {
        let slide = pres.addSlide();

        // slide.background = { color: "700031" };
        slide.background = { path: "./images/dummy.png" }
        slide.color = "#ffffff";


        slide.addShape(pres.ShapeType.rect, {
            x: 0.1, y: 0.1, w: "97%", h: "97%", fill: { color: "ff0070" }
        });

        addRandomShapes(pres, slide, 10)

        slide.addImage({
            path: "./images/logo.png",
            x: "80%",
            y: "10%",
            w: 1.5,
            h: 1.5,
        });

        slide.slideNumber = { x: "90%", y: "80%", fontFace: "Courier", fontSize: 32, color: "EEEEEE" };

        // Add the title
        slide.addText(slideData.title, { x: 0.5, y: 1, fontSize: 28, fontFace: "Montserrat", color: "ffffff", bold: true });

        // Convert HTML content to plain text
        let contentText = htmlToPlainText(slideData.content);

        // Add the content to the slide
        slide.addText(contentText, { x: 0.5, y: 3.2, fontSize: 14, color: "fac8de", fontFace: "Poppins" });
    });

    // 4. Save the Presentation
    const fileName = path?.split("/")?.at(-1)?.split(".json")[0]?.toLowerCase()?.split(" ")?.join("_");

    const pptxResult = pres.writeFile({ fileName: `./pptx/slides/${fileName}_presentation.pptx` });
    if (pptxResult) {
        console.log(`${fileName}_presentation.pptx saved`);
    }
}

module.exports = createPPTX