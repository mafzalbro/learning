const fs = require("fs");
const getDirName = require("path").dirname;

function writeFile(path, contents, cb) {
    fs.mkdir(getDirName(path), { recursive: true }, (err) => {
        if (err) return cb(err);
        fs.writeFile(path, contents, cb);
    });
}

const saveJSON = (refinedObjects, path) => {
    let json = JSON.stringify(refinedObjects, null, 2); // Pretty formatting

    if (!json) {
        return { message: "JSON is empty", json: [] };
    }

    if (json && refinedObjects.length > 0) {
        if (!fs.existsSync(path)) {
            writeFile(path, json, (err) => {
                if (err) console.error("Error writing file:", err);
            });
            fs.writeFileSync(path, json);
        } else {
            fs.writeFileSync(path, json);
        }

        return { message: `JSON is ready with ${refinedObjects.length !== 1 ? refinedObjects.length : refinedObjects[0].length} prompts`, json };
    }

    return { message: "JSON is empty", refinedObjects };
};

module.exports = saveJSON;