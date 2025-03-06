const createDarkPPTX = require("./varaints/dark");
const createLightPPTX = require("./varaints/light");
const createMixedPPTX = require("./varaints/mixed");

const createPPTX = (path, theme, mainDir) => {

    switch (theme) {
        case "dark":
            createDarkPPTX(path, mainDir)
            break;
        case "mixed":
            createMixedPPTX(path, mainDir)
            break;
        default:
            createLightPPTX(path, mainDir)
            break;
    }
}

module.exports = createPPTX