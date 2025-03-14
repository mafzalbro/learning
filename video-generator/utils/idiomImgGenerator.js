const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
const path = require("path");

const cartoonCharacters = [
  "./images/elements/characters/cartoon1.png",
  "./images/elements/characters/cartoon2.png",
];

function getBase64(filePath) {
  const image = fs.readFileSync(filePath);
  return `data:image/png;base64,${image.toString("base64")}`;
}

async function generateIdiomsImages(idiomsData, pathName) {
  console.log("Generating minimalistic idiom images...");

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

    const characterLeft = getBase64(cartoonCharacters[0]);
    const characterRight = getBase64(cartoonCharacters[1]);

    const htmlTemplate = `
            <html>
                <body style="
                    background: linear-gradient(to bottom, #f7f7f7, #e0e0e0);
                    color: #333;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                    padding: 2rem;
                    position: relative;
                ">

                    <!-- Cartoon Characters -->
                    <img src="${characterLeft}" style="position: absolute; left: 15px; bottom: 15px; width: 150px; object-fit: contain;">
                    <img src="${characterRight}" style="position: absolute; right: 15px; bottom: 15px; width: 100px; object-fit: contain;">
                    <div style="
                        border: 2px dotted #333;
                        padding: 20px;
                        border-radius: 23px;
                        width: 85%;
                    ">
                        <p style="
                            font-size: 2.8rem;
                            font-weight: bold;
                            color: #222;
                            font-family: 'Jameel Noori Nastaleeq', serif;
                            line-height: 1.6;
                            direction: rtl;
                        ">
                             ❞ ${urdu} ❝
                        </p>

                        <p style="
                            font-size: 1.8rem;
                            color: #444;
                            font-family: 'Poppins', sans-serif;
                            margin-top: 10px;
                        ">
                            ❝ ${eng} ❞
                        </p>
                    </div>
                </body>
            </html>`;

    await nodeHtmlToImage({ output: outputPath, html: htmlTemplate });
    console.log(`Idiom image ${i + 1} created: ${fileName}`);
  }
}

module.exports = { generateIdiomsImages };
