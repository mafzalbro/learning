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

    const randomFile = files[index % files.length]; // Cycle through images if more hadiths than images
    const imagePath = path.join(bgDir, randomFile);

    // Convert image to Base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/${path.extname(randomFile).slice(1)};base64,${imageBuffer.toString('base64')}`;

    return base64Image;
}

// Function to generate images for hadiths
async function generateHadithImages(hadithData, pathName) {
    console.log("Generating Islamic-themed Hadith images...");

    // Ensure the output directory exists
    const outputDir = `./images/${pathName}-images`;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (let i = 0; i < hadithData.length; i++) {
        const { hadith, numbering, book } = hadithData[i];

        const fileName = `hadith_${numbering.replace(/\//g, '-')}_${book.replace(/\s+/g, "_").toLowerCase()}`;
        const outputPath = path.join(outputDir, `${fileName}.png`);

        if (fs.existsSync(outputPath)) {
            console.log(`Hadith image ${i + 1} already exists - ${fileName}`);
            continue;
        }

        // Get a random background image as Base64
        const bgImage = getRandomBackgroundImage(i);
        if (!bgImage) continue;

        // Islamic-themed decorations (golden accents, crescent moon, patterns)
        await nodeHtmlToImage({
            output: outputPath,
            html: `
                <html>
                    <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Outfit:wght@300;500&display=swap" rel="stylesheet">
                    </head>
                    <body style="
                        color: #fff;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.2rem;
                        font-family: 'Outfit', serif;
                        text-align: center;
                        position: relative;
                        background-image: url('${bgImage}');
                        background-size: cover;
                        background-position: center;
                        padding: 2rem;
                        line-height: 1.6;
                    ">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6);"></div>

                        <!-- Islamic Patterns and Design Elements -->
                        <div style="position: absolute; top: 5%; left: 50%; transform: translateX(-50%); font-size: 3rem; color: gold;">🌙</div>
                        <div style="position: absolute; bottom: 5%; left: 10%; width: 60px; height: 60px; background-color: rgba(255, 215, 0, 0.2); border-radius: 50%;"></div>
                        <div style="position: absolute; bottom: 15%; right: 10%; width: 80px; height: 80px; border-radius: 50%; border: 3px solid gold;"></div>
                        <div style="position: absolute; top: 50%; left: 40%; width: 100px; height: 5px; background-color: rgba(255, 215, 0, 0.3);"></div>
                        <div style="position: absolute; bottom: 10%; left: 30%; width: 50px; height: 50px; background-color: rgba(255, 215, 0, 0.15); border-radius: 50%;"></div>

                        <!-- Hadith Card -->
                        <div style="
                            max-width: 80%;
                            z-index: 10;
                            position: relative;
                            background: rgba(255, 255, 255, 0.1);
                            padding: 1.5rem;
                            border-radius: 15px;
                            box-shadow: 0px 4px 6px rgba(255, 215, 0, 0.4);
                            border: 2px solid gold;
                        ">
                            <p style="font-size: 2rem; font-weight: bold; color: #f8f8f8;">
                                ❝ ${hadith} ❞
                            </p>
                            <p style="margin-top: 1rem; font-size: 1rem; font-family: 'Outfit', sans-serif; color: gold; opacity: 0.9;">
                            📖 ${book} - ${numbering}
                            </p>
                            </div>
                            </body>
                            </html>`
        });
        
        // <p style="font-size:1.6rem; font-family: 'Jameel Noori Nastaleeq', serif;">آپ کیسے ہیں؟</p>

        console.log(`Hadith image ${i + 1} created: ${fileName}`);
    }
}

module.exports = { generateHadithImages };