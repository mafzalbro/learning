import { client } from "@gradio/client";

const run = async () => {
    const app = await client("https://74c997c0ebba5401d3.gradio.live/");
    const result = await app.predict(66, [
        true, // boolean  in 'Random' Checkbox component		
        "Howdy!", // string  in 'Seed' Textbox component
    ]);

    console.log(result.data);

};

run();
