const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");
const { config } = require("dotenv");
config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function getResponse(message) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    console.log("Generating response...");
    try {
        const result = await chatSession.sendMessage(message);
        return result.response.text()
    } catch (error) {
        console.error("Error generating response:", error);
        return ""
    }

}

module.exports = getResponse;