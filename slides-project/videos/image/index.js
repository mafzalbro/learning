// const saveFile = require("../../utils/saveFile");

const { Client } = require("@gradio/client");

async function query(data) {
    const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

const getImage = async () => {
    const client = await Client.connect("https://stabilityai-stable-diffusion-3-5-large.hf.space/");
    const result = await client.predict("/infer", {
        prompt: "Something green and text made of trees and leaves mention ''how are you my boy''",
        negative_prompt: "Hello!!",
        seed: 0,
        randomize_seed: true,
        width: 512,
        height: 512,
        guidance_scale: 0,
        num_inference_steps: 1,
    });

    const buffer = await result.data;
    const type = result.type;
    saveFile(Buffer.from(buffer), `"image.${type.split("/")[1]}"`);

    console.log(result.data);
}

const createImage = () => {
    // console.log("Hey this is image");

    // query({ "inputs": `Fwell place, text written on that "How are you my boy"` }).then(async (response) => {
    //     // Use image

    //     console.log(await response.text());
    //     const buffer = await response.arrayBuffer();
    //     saveFile(Buffer.from(buffer), "image.jpg");

    // });


    getImage()
}

createImage();

// module.exports = createImage;