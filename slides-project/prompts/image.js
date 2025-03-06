const imagePrompt = (topic, mainTopic, index) => {
  console.log("----------------------------------------\n TOPIC", index, ":", topic, "\n-------------------");

  return {
    text: `MAIN Topic: ${mainTopic}. You have to create an amazing image prompt for almost 10 prompts for image generating from AI on the topic ${topic}
        Looks like:

        [
          { title: "It will be heading to display on Image like computer on desk", caption: "It will be voiceover for video so use lines related to the topic, must be short, clear, and crisp and all lines must be connected to each other, whole json will be equal to one video, again remember i want here an amazing script for a video in caption part in whole JSON, in which you have to teach anything, it will be generic information, not deep about the topic no visualization but informative and interesting - again saying be short and engaging in true sense", prompt: "An image that can give multiple things, you have to give clear and in-depth detail, don't be complex one i.e. writing text on images or anything like that complex (avoid) be simple" },
        ]

        and keep in mind that it must return jSON only...!!!

        I have to generate video at the end so caption will be a full script for a video.
        `,
  }
}

module.exports = imagePrompt