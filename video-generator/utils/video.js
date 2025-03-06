const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");
const fs = require("fs");
const path = require("path");
const { convertImgsToVideo } = require("../utils/convertImgsToVideo");

// Set FFmpeg binary path
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfmpegPath(ffprobeStatic.path);

const IMAGES_DIR = "./images/text-images";
const TEMP_DIR = "./output/temp";
const OUTPUT_VIDEO = "./output/final_video.mp4";

// Ensure necessary directories exist
if (!fs.existsSync(TEMP_DIR)) {
    console.log("📂 Creating temp directory:", TEMP_DIR);
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

async function createVideoFromImages(fps = 30, durationPerImage = 2, fadeDuration = 1) {
    const images = fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
        .map(file => path.join(IMAGES_DIR, file))
        .sort((a, b) => a.localeCompare(b));

    if (images.length === 0) {
        console.error("❌ No images found in", IMAGES_DIR);
        return;
    }

    console.log("🎥 Creating individual clips...");
    const videoClips = [];

    for (let i = 0; i < images.length; i++) {
        const clipPath = path.join(TEMP_DIR, `clip${i}.mp4`);
        if (fs.existsSync(clipPath) && fs.statSync(clipPath).size > 0) {
            console.log(`✅ Clip already exists: ${clipPath}`);
            videoClips.push(clipPath);
            continue;
        }

        await new Promise((resolve, reject) => {
            ffmpeg()
                .input(images[i])
                .loop(durationPerImage) // Duration per image
                .output(clipPath)
                .videoCodec("libx264")
                .outputOptions(["-pix_fmt yuv420p", `-r ${fps}`, "-tune stillimage"])
                .on("end", () => {
                    videoClips.push(clipPath);
                    resolve();
                })
                .on("error", reject)
                .run();
        });
    }

    console.log("🎬 Combining clips into final video...");
    await mergeVideosWithFade(videoClips, OUTPUT_VIDEO, fps, fadeDuration);

    console.log("✅ Video created successfully:", OUTPUT_VIDEO);
}

async function mergeVideosWithFade(clips, output, fps, fadeDuration) {
    // Assuming durationPerImage is the total duration per clip
    const durationPerImage = 5; // Set this based on your specific needs

    // Create the filter complex string for fade-in and fade-out
    const filterComplex = clips.map((clip, index) => {
        const fadeInStart = index === 0 ? 0 : durationPerImage - fadeDuration;
        const fadeOutStart = durationPerImage - fadeDuration;

        // Apply fade-in at the start and fade-out at the end of each clip
        return `[${index}:v]fade=t=in:st=${fadeInStart}:d=${fadeDuration},fade=t=out:st=${fadeOutStart}:d=${fadeDuration}[v${index}]`;
    }).join('; ');

    // Map to get input options for each video file
    const concatInput = clips.map((clip, index) => `-i ${clip}`).join(' ');

    // Prepare the command for ffmpeg
    const command = ffmpeg();

    // Add inputs to ffmpeg
    clips.forEach(clip => {
        command.input(clip);
    });

    // Apply the complex filter and concatenate videos
    command.complexFilter([
        filterComplex,
        // Concatenate all video streams together after fade effects
        `concat=n=${clips.length}:v=1:a=1[vout]`
    ])
        .output(output)
        .videoCodec("libx264")
        .audioCodec("aac")
        .outputOptions(["-pix_fmt yuv420p", `-r ${fps}`, "-shortest"]);

    command.on("end", () => {
        console.log("🎬 Final video saved at", output);
    }).on("error", (err) => {
        console.error("❌ Error merging videos:", err);
    }).run();
}
// Example usage
createVideoFromImages(30, 2, 1); // fps = 30, duration per image = 2 seconds, fade duration = 1 second

// ✅ FIXED: Merge using mergeToFile()
// async function mergeVideos(videoClips, outputFile, fps) {
//     return new Promise((resolve, reject) => {
//         if (videoClips.length === 1) {
//             fs.copyFileSync(videoClips[0], outputFile);
//             return resolve();
//         }

//         const ffmpegCmd = ffmpeg();

//         // Add each video clip as an input
//         videoClips.forEach(clip => ffmpegCmd.input(clip));

//         ffmpegCmd
//             .videoCodec("libx264")
//             .outputOptions(["-pix_fmt yuv420p", `-r ${fps}`, "-movflags +faststart"])
//             .on("end", resolve)
//             .on("error", reject)
//             .mergeToFile(outputFile, TEMP_DIR); // ✅ Merging directly
//     });
// }

// Run the function
// createVideoFromImages();

convertImgsToVideo();


module.exports = { createVideoFromImages }
