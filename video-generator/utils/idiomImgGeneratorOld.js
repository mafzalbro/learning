const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
const path = require("path");

const cartoonCharacters = [
  "./images/elements/characters/cartoon1.png",
  // "./images/elements/characters/cartoon1.jpg",
  "./images/elements/characters/cartoon2.png",
];

function getBase64(filePath) {
  const image = fs.readFileSync(filePath);
  return `data:image/png;base64,${image.toString("base64")}`;
}

function getRandomCharacterBase64() {
  const characterPath =
    cartoonCharacters[Math.floor(Math.random() * cartoonCharacters.length)];
  return getBase64(characterPath);
}

// Function to generate images for idioms
async function generateIdiomsImages(idiomsData, pathName) {
  console.log("Generating educational idiom images...");

  const outputDir = `./images/${pathName}-images`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < idiomsData.length; i++) {
    const { urdu, eng } = idiomsData[i];

    const fileName = `idiom_${i + 1}`;
    const outputPath = path.join(outputDir, `${fileName}.png`);

    if (fs.existsSync(outputPath)) {
      console.log(`Idiom image ${i + 1} already exists - ${fileName}`);
      continue;
    }

    // const characterLeft = getRandomCharacterBase64();
    // const characterRight = getRandomCharacterBase64();
    const characterLeft = getBase64(
      "./images/elements/characters/cartoon1.png"
    );
    const characterRight = getBase64(
      "./images/elements/characters/cartoon2.png"
    );

    const htmlTemplate = `
            <html>
                <body style="
                    background-color: black;
                    // color: #ffe54f !important;
                    color:rgb(255, 236, 127) !important;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-family: 'Arial', sans-serif;
                    text-align: center;
                    padding: 2rem;
                    line-height: 2;
                    position: relative;
                    ">
                    <div style="margin-top: -100px">
                            <span style="font-family: 'Outfit'; font-size: 1.5rem;">${
                              i + 1
                            } - </span>
                        <span style="font-family: 'Outfit'; font-size: 3.5rem; margin: '0'; padding: '0';"> (Idiom) <span style="
                            font-size: 3.5rem;
                            font-weight: lighter;
                            text-align: right;
                            font-family: 'Jameel Noori Nastaleeq', serif;
                            line-height: 1.6;
                            direction: rtl;
                            ">محاورہ</span>
                        </span>
                    </div>

                    <!-- Cartoon Characters -->
                        <img src="${characterLeft}" style="position: absolute; left: 20px; top: 20px; width: 80px; object-fit: contain;">
                        <img src="${characterLeft}" style="position: absolute; left: 0px; top: 0px; width: 100%; object-fit: contain; opacity: 0.08">
                        <img src="${characterLeft}" style="position: absolute; left: 15px; bottom: 15px; width: 150px; object-fit: contain;">
                        <img src="${characterRight}" style="position: absolute; right: 15px; bottom: 15px; width: 100px; object-fit: contain;">

                    <div style="
                        background:rgb(14, 14, 14);
                        padding: 20px;
                        padding-top: 0px;
                        border-radius: 25px;
                        width: 80%;
                        box-shadow: 4px 4px 20px rgb(26, 26, 26);
                        border: 5px dashed black;
                    ">
                    <p style="
                        font-size: 3rem;
                        font-weight: lighter;
                        text-align: right;
                        font-family: 'Jameel Noori Nastaleeq', serif;
                        line-height: 1.6;
                        direction: rtl;
                        ">
                             ❞${urdu}❝ 
                        </p>
                        <hr style="border: 0.1px solid black; width: 80%; margin: 10px auto;">
                        <p style="
                            font-size: 2rem;
                            font-family: 'Outfit';
                            text-align: center;
                        ">
                            ❝${eng}❞
                        </p>
                    </div>
                </body>
            </html>`;

    await nodeHtmlToImage({ output: outputPath, html: htmlTemplate });
    console.log(`Idiom image ${i + 1} created: ${fileName}`);
  }
}

module.exports = { generateIdiomsImages };
