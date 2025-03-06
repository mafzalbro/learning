const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const path = require('path');
const { moon, star, masjid, bookImage, lantern } = require('../images/elements/graphics/main');

// Function to get a random image from /images/online-images and convert it to Base64
function getRandomBackgroundImage(index) {
    const bgDir = './images/online-images';
    const files = fs.readdirSync(bgDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    if (files.length === 0) {
        console.error("No background images found in /images/online-images!");
        return null;
    }

    const randomFile = files[index % files.length]; // Cycle through images
    const imagePath = path.join(bgDir, randomFile);

    // Convert image to Base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/${path.extname(randomFile).slice(1)};base64,${imageBuffer.toString('base64')}`;

    return base64Image;
}

const getImage = (imagePath) => {
    // Convert image to Base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/${path.extname(imagePath).slice(1)};base64,${imageBuffer.toString('base64')}`;

    return base64Image
}

// Array of Islamic-themed designs (Text color remains white)
const islamicDesigns = [
    // 🌙 **Design 1: Crescent moon with stars and glowing border**
    () => `
        <div style="position: absolute; top: 5%; left: 5%; font-size: 4rem;">
            <img src="${moon}" alt="crescent-moon">
        </div>
        <div style="position: absolute; top: 10%; right: 15%; font-size: 2rem;">
            <img src="${star}" alt="golden-star">
        </div>
        <div style="position: absolute; bottom: 15%; left: 25%; font-size: 1.8rem;">
            <img src="${star}" alt="golden-star">
        </div>
        <div style="position: absolute; bottom: 5%; right: 10%; font-size: 2rem;">
            <img src="${star}" alt="golden-star">
        </div>
    `,

    // 🕌 **Design 2: Mosque silhouette with hanging lanterns**
    () => `
        <div style="position: absolute; top: 0%; left: 50%; transform: translateX(-50%); font-size: 3.5rem;">
            <img src="${masjid}" alt="mosque-silhouette">
        </div>
        <div style="position: absolute; top: 12%; left: 15%; font-size: 2rem;">
            <img src="${lantern}" alt="hanging-lantern">
        </div>
        <div style="position: absolute; top: 12%; right: 15%; font-size: 2rem;">
            <img src="${lantern}" alt="hanging-lantern">
        </div>
        <div style="border: 10px solid gold; padding: 2rem; border-radius: 20px;"></div>
    `,

    // ✨ **Design 3: Glowing dots with subtle Islamic patterns**
    () => `
        <div style="position: absolute; bottom: 20%; left: 12%; width: 55px; height: 55px; background-color: rgba(255, 215, 0, 0.2); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: 12%; right: 12%; width: 45px; height: 45px; background-color: rgba(255, 215, 0, 0.2); border-radius: 50%;"></div>
        <div style="position: absolute; top: 48%; left: 42%; width: 75px; height: 4px; background-color: rgba(255, 215, 0, 0.3);"></div>
    `,

    // 🌟 **Design 4: Crescent with golden frame and accents**
    () => `
        <div style="position: absolute; top: 12%; right: 12%; font-size: 2rem;">
            <img src="${moon}" alt="crescent-moon">
        </div>
        <div style="position: absolute; top: 25%; left: 18%; font-size: 1.5rem;">
            <img src="${star}" alt="golden-star">
        </div>
        <div style="border: 6px solid gold; padding: 2rem; border-radius: 15px;"></div>
    `,

    // ⭐ **Design 5: Decorative stars and intricate golden details**
    () => `
        <div style="position: absolute; bottom: 7%; left: 12%; font-size: 1.8rem;">
            <img src="${star}" alt="golden-star">
        </div>
        <div style="position: absolute; bottom: 18%; right: 12%; font-size: 2rem;">
            <img src="${star}" alt="golden-star">
        </div>
    `
];

// Function to generate images for hadiths
async function generateUrduHadithImages(hadithData, pathName) {
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

        const bgImage = getRandomBackgroundImage(i);
        if (!bgImage) continue;

        // Cycle through 5 different designs using modulo (%)
        const designIndex = i % islamicDesigns.length;
        const designElements = islamicDesigns[designIndex](bgImage);


        const htmlTemplate = `
            <html>
                <body style="
                    color: #ffffff;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-family: 'Jameel Noori Nastaleeq', serif;
                    text-align: right;
                    direction: rtl;
                    position: relative;
                    background-image: url('${bgImage}');
                    background-size: cover;
                    background-position: center;
                    padding: 2rem;
                    line-height: 2;
                ">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6);"></div>

                    <!-- Islamic Decorative Elements -->
                    ${designElements}

                 <!-- Hadith Card -->
                <div style="
                    max-width: 80%;
                    z-index: 10;
                    position: relative;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    box-shadow: 0px 6px 10px rgba(255, 215, 0, 0.5);
                    overflow: hidden; /* Ensures the border stays rounded */
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                ">
                    <!-- Border Wrapper -->
                    <div style="
                        border: 5px solid transparent;
                        border-image: url('${getImage("./images/elements/border/patterns2.png")}') 40 round;
                        border-radius: 30px;
                        padding: 30px; /* Space inside the border */
                        width: 100%;
                    ">
                        <p style="
                            font-size: 3rem;
                            font-weight: bold;
                            color: #ffffff;
                            direction: rtl;
                            text-align: right;
                            font-family: 'Jameel Noori Nastaleeq', serif;
                            line-height: 1.6;
                        ">
                            ❞  ${hadith}  ❝
                        </p>
                        <p style="
                            margin-top: 1rem;
                            font-size: 2rem;
                            color: gold;
                            opacity: 0.9;
                            font-family: 'Jameel Noori Nastaleeq', serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            gap: 10px;
                        ">
                            <img src="${bookImage}" alt="book" style="height: 45px; width: 45px;"> ${book} - ${numbering}
                        </p>
                    </div>
                </div>

                </body>
            </html>`;

        await nodeHtmlToImage({ output: outputPath, html: htmlTemplate });
        console.log(`Hadith image ${i + 1} created: ${fileName}`);
    }
}

module.exports = { generateUrduHadithImages };
