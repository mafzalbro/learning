// start asking him something!!!

const prompt = require("../prompts/general");
const getResponse = require("../utils/getResponse");
const extractJsonFromString = require("extract-json-from-string");
const getRefinedObject = require("../utils/getRefinedObject");
const saveJSON = require("../utils/saveJSON");

const genericService = async () => {

    const response = (await getResponse(prompt.text))?.replace("```json", "")?.replace("```", "");
    
    let objects = extractJsonFromString(response);

    if (objects.length === 0) {
        objects = [JSON.parse(response)];
    }

    const refinedObjects = getRefinedObject(objects);

    const ack = saveJSON(refinedObjects, "results/data.json");
    console.log(ack);



}
module.exports = genericService