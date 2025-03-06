const getResponse = require("../utils/getResponse");
// const extractJsonFromString = require("extract-json-from-string");
const getRefinedObject = require("../utils/getRefinedObject");
const saveJSON = require("../utils/saveJSON");
// const { extractJSON } = require("extract-first-json");
const { parseExtractedJSON } = require("../utils/extractJson");
const createPPTX = require("../pptx");
const fs = require("fs");

const slidesService = async (prompt, topic, mainDir, theme) => {
    // try {
    const path = `results/${mainDir}/${topic}.json`

    if (fs.existsSync(path)) {
        console.log(`Skipping ${path} as already exists!!!`);
        // checking that if pptx also done???
        createPPTX(path, theme, mainDir)
        return
    }

    const response = (await getResponse(prompt.text));

    if (!response) {
        return
    }

    console.log({ resp: response.length, topic });

    // let modifiedResponse = JSON.stringify(response );

    let objects = parseExtractedJSON(response);

    console.log({ checkJSON: objects.length });

    const refinedObjects = getRefinedObject(objects);

    const ack = saveJSON(refinedObjects, path);

    console.log(ack.message);
    if (ack.json.length) {
        createPPTX(path, theme, mainDir)
    }
    return ack?.json
    // } catch (error) {
    //     throw new Error("Something Went Wrong " + error.message)
    // }

}
module.exports = slidesService