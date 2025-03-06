const { writeFileSync } = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

const getOnlineImage = async () => {
    try {
        const image = await fetch("https://picsum.photos/1024/1024").then((r) => r.blob()).then((blob) => blob);

        console.log(image);

        writeFileSync("./images/online-images/index -" + Date.now() + "." + image.type.split("/")[1], Buffer.from(await image.arrayBuffer()));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { getOnlineImage };