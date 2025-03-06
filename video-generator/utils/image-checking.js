const nodeHtmlToImage = require('node-html-to-image')

const genericImage = async () => {
    try {
        const text = "How to get started with Date Object"
        nodeHtmlToImage({
            output: './image.png',
            html: `<html><head><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200&display=swap" rel="stylesheet"></head></head><body style="background-color: #000; color: #fff; height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 2rem; font-family: 'Outfit'; text-align: center; font-weight: 400;"> <h1>${text}</h1> </body></html>`
        })
            .then(() => console.log('The image was created successfully!'))
    } catch (error) {
        console.log(error.message);
    }
};

genericImage();