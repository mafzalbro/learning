const { generateImages } = require("./utils/html-to-image");
const { getOnlineImage } = require("./utils/image");
const quotes = require("./titles/motivation");
const hadiths = require("./titles/ramadan");
const urduHadiths = require("./titles/ramadan-urdu");
const sentences = require("./titles/sentences");
const { convertImgsToVideo } = require("./utils/convertImgsToVideo");
const { generateHadithImages } = require("./utils/hadithsGenerator");
const { generateUrduHadithImages } = require("./utils/urduHadithsGenerator");
// const { generateIdiomsImages } = require("./utils/idiomImgGenerator");
const { generateIdiomsImages } = require("./utils/idiomImgGeneratorOld");
const { publishToInstagram } = require("./publish/instagram");

const run = async () => {
  console.log("process is running...");
  try {
    // Get online image
    // for (let i = 0; i < 200; i++) {
    //     await getOnlineImage();
    // }
    // generateImages(quotes, "quotes").finally(() => {
    //     convertImgsToVideo("quotes")
    // })
    // generateHadithImages(hadiths, "hadiths").finally(() => {
    //     convertImgsToVideo("hadiths")
    // })
    // generateUrduHadithImages(urduHadiths, "urdu-hadiths").finally(() => {
    //   convertImgsToVideo("urdu-hadiths");
    // });
    generateIdiomsImages(sentences, "sentences").finally(() => {
      // convertImgsToVideo("sentences")
    });

    // publishToInstagram(
    //   "images/hadiths-images/hadith_1-37_bukhari.png",
    //   "hadith"
    // );
  } catch (error) {
    console.log(error.message);
  }
};

run();
