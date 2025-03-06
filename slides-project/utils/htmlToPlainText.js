
const cheerio = require("cheerio");

// Function to convert HTML to an array of PptxGenJS text objects
function htmlToPptxText(html) {
    const $ = cheerio.load(html);
    const textObjects = [];

    // Helper function to process each node recursively
    function processNode(node, parentStyles = {}) {
        $(node).contents().each((i, el) => {
            if (el.type === 'text') {
                // Create a text object with inherited styles
                textObjects.push({
                    text: $(el).text(),
                    options: { ...parentStyles }
                });
            } else if (el.type === 'tag') {
                // Determine styles based on the tag
                let styles = { ...parentStyles };
                switch (el.tagName.toLowerCase()) {
                    case 'strong':
                    case 'b':
                        styles.bold = true;
                        break;
                    case 'em':
                    case 'i':
                        styles.italic = true;
                        break;
                    case 'u':
                        styles.underline = true;
                        break;
                    case 'h1':
                        styles.fontSize = 24;
                        styles.bold = true;
                        break;
                    case 'h2':
                        styles.fontSize = 20;
                        styles.bold = true;
                        break;
                    case 'h3':
                        styles.fontSize = 18;
                        styles.bold = true;
                        break;
                    // Add more tags as needed
                }
                // Recursively process child nodes with the current styles
                processNode(el, styles);
            }
        });
    }

    // Start processing from the root node
    processNode($.root());

    return textObjects;
}


module.exports = htmlToPptxText;