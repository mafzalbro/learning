const getResponse = require("../utils/getResponse")
const saveJSON = require("../utils/saveJSON");
const { parseExtractedJSON } = require("../utils/extractJson");
const fs = require("fs")
const createImage = require("../utils/")

const imageService = async (prompt, mainDir, topic) => {
    const path = `resultsGraph/${mainDir}/${topic}.json`

    console.log(path);

    if (fs.existsSync(path)) {
        console.log(`Skipping ${path} as already exists!!!`);
        return
    }

    const response = await getResponse(prompt.text)

    if (!response) {
        return
    }

    let refinedObjects = parseExtractedJSON(response);

    console.log({ checkJSON: refinedObjects.length });


    const ack = saveJSON(refinedObjects, path);

    console.log(ack.message);
    if (ack.json.length) {
        createImage()
        console.log("got JSON of", ack.json.length, "length...!");
    }
    return ack?.json

}

module.exports = imageService