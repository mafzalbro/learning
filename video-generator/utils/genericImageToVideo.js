const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");

const convertImgsToVideo = () => {
    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg.setFfprobePath(ffprobeStatic.path);

    // List of image files

    const images = [
        './images/text-images/a_guide_to_javascript_animations_with_gsap.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png',
        './images/text-images/a_guide_to_javascript_decorators.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png',
        './images/text-images/a_guide_to_javascript_decorators.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png',
        './images/text-images/a_guide_to_javascript_decorators.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png',
        './images/text-images/a_guide_to_javascript_decorators.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png',
        './images/text-images/a_guide_to_javascript_decorators.png',
        './images/text-images/understanding_the_debounce_and_throttle_functions.png'
    ];

    const outputFilePath = './output/video.mp4';

    ffmpeg()
        .input('concat:' + images.join('|')) // Concatenate the image files
        .inputOptions('-framerate 0.5')  // One image per second
        .outputOptions('-t 30')  // Total video time: 30 seconds
        .output(outputFilePath)
        .on('progress', function (progress) {
            console.log(`Frames: ${progress.frames}`);
        })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Merging finished!');
        })
        .run();

}

module.exports = { convertImgsToVideo }