const funnyStoryPrompt = (topic, mainTopic, index) => {
  console.log("----------------------------------------\n TOPIC", index, ":", topic, "\n-------------------");

  return {
    text: `MAIN Topic: ${mainTopic}. Story Number: ${index}.
can you provide me story which reveals funny suspense at the end like

start with serious
mid with down 
end with unxpected

only 5 lines for a story - more than a joke - give array of 5 lines 

like

story = [{dialog: "", title: "", lineNum: ""}]


`,
  }
}

module.exports = funnyStoryPrompt