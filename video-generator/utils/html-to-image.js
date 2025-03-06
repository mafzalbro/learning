const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const path = require('path');

// Function to get a random image from /images/online-images and convert it to Base64
function getRandomBackgroundImage(index) {
    const bgDir = './images/online-images';
    const files = fs.readdirSync(bgDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    if (files.length === 0) {
        console.error("No background images found in /images/online-images!");
        return null;
    }

    // const randomFile = files[Math.floor(Math.random() * files.length)];
    const randomFile = files[index];
    const imagePath = path.join(bgDir, randomFile);

    // Convert image to Base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/${path.extname(randomFile).slice(1)};base64,${imageBuffer.toString('base64')}`;

    return base64Image;
}

// Function to generate images
async function generateImages(titles, pathName) {
    console.log("Generating images...");

    // Ensure the output directory exists
    const outputDir = `./images/${pathName}-images`;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }


    for (let i = 0; i < titles.length; i++) {
        const text = titles[i];

        const fileName = text.replace(/[\/:?]/g, "").replace(/\s+/g, "_").toLowerCase();
        const outputPath = path.join(outputDir, `${fileName}.png`);

        if (fs.existsSync(outputPath)) {
            console.log(`Image ${i + 1} already exists - ${fileName}`);
            continue;
        }

        // Get a random background image as Base64
        const bgImage = getRandomBackgroundImage(i);
        if (!bgImage) continue;

        // Background objects
        const shapes = `
            <div style="position: absolute; top: 10%; left: 15%; width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 20%; right: 10%; width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2);"></div>
            <div style="position: absolute; top: 50%; left: 40%; width: 100px; height: 5px; background-color: rgba(255, 255, 255, 0.3);"></div>
            <div style="position: absolute; bottom: 10%; left: 30%; width: 50px; height: 50px; background-color: rgba(255, 255, 255, 0.15); border-radius: 50%;"></div>
        `;

        // Generate image
        await nodeHtmlToImage({
            output: outputPath,
            html: `
                <html>
                    <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400&display=swap" rel="stylesheet">
                    </head>
                    <body style="
                        color: #fff;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.5rem;
                        font-family: 'Outfit', sans-serif;
                        text-align: center;
                        font-weight: 400;
                        position: relative;
                        background-image: url('${bgImage}');
                        background-size: cover;
                        background-position: center;
                    ">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6);"></div>
                        ${shapes}
                        <h1 style="z-index: 10; max-width: 80%; position: relative;">${text}</h1>
                    </body>
                </html>`
        });

        console.log(`Image ${i + 1} created: ${text}`);
    }
}

module.exports = { generateImages };
