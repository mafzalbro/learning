const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");
const fs = require('fs');

const convertImgsToVideo = (path = "text") => {
    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg.setFfprobePath(ffprobeStatic.path);

    // List of image files
    const images = fs.readdirSync(`./images/${path}-images/`).filter(file => /\.(png|jpg|jpeg)$/i.test(file)).map(image => `./images/${path}-images/` + image);

    const outputFilePath = `./output/${path}.mp4`;
    const audio = `./audios/${path}.mp3`;

    ffmpeg()
        .input('concat:' + images.join('|')) // Concatenate the image files
        .inputOptions('-framerate 1')  // One image per second
        .input(audio)  // Add the background audio
        .audioCodec('aac')  // Specify audio codec (AAC is common for MP4 videos)
        .audioBitrate('192k')  // Specify the audio bitrate
        .videoCodec('libx264')  // Ensure video is encoded with libx264
        .outputOptions('-pix_fmt yuv420p') // Make sure video is compatible with most players
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
};

module.exports = { convertImgsToVideo };
