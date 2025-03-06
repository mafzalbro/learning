const fs = require("fs");
const path = require("path");

function writeFile(filePath, contents, cb) {
    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
        if (err) return cb(err);
        fs.writeFile(filePath, contents, cb);
    });
}

const saveFile = (data, filePath) => {
    if (!data) {
        return { message: "File content is empty", data: null };
    }

    if (!fs.existsSync(filePath)) {
        writeFile(filePath, data, (err) => {
            if (err) console.error("Error writing file:", err);
        });
    }

    fs.writeFileSync(filePath, data);

    return { message: `File saved successfully at ${filePath}`, data };
};

module.exports = saveFile;
