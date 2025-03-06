const { parse } = require("marked");

const getRefinedObject = (objects) => {

    let contentObject = objects.length === 1 ? objects[0] : objects;

    console.log(contentObject);


    let refinedObjects = [];
    for (let object of contentObject) {
        let content = parse(object.content);
        object.content = content;
        refinedObjects.push(object);
    }

    return refinedObjects
};

module.exports = getRefinedObject