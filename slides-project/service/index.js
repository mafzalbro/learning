// const genericService = require("./generic");
const slidesService = require("./slides");
const slidePrompt = require("../prompts");
const slidesTopics = require("../topics");
const imageService = require("./images");
const imagePrompt = require("../prompts/image");

const startPPTXServices = async () => {
    // it is generic service that will create content for presentation
    // genericService();

    const themes = ["light", "dark", "mixed"];

    const selectTheme = (index) => {
        return themes[(index - 1) % themes.length];
    };

    for (const slidesTopic of slidesTopics) {
        const topics = slidesTopic.topics;
        const mainDir = slidesTopic.mainDir;
        for (const topic of topics) {
            const index = topics.indexOf(topic)
            const prompt = slidePrompt(topic, (index + 1))
            await slidesService(prompt, topic, mainDir, selectTheme(index));
        }
    }
}

const startImageServices = async () => {
    for (const slidesTopic of slidesTopics) {
        const topics = slidesTopic.topics;
        const mainDir = slidesTopic.mainDir;
        for (const topic of topics) {
            const index = topics.indexOf(topic)
            const prompt = imagePrompt(topic, mainDir, (index + 1));
            await imageService(prompt, mainDir, topic);

        }
    }
}
module.exports = { startPPTXServices, startImageServices }