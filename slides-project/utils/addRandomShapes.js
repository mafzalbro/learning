// Utility function to add random shapes to a slide
function addRandomShapes(pres, slide, shapeCount = 5) {

    const shapes = [
        // pres.shapes.RECTANGLE,
        pres._shapeType.rect,
        pres._shapeType.triangle,
        pres._shapeType.cube,
        pres._shapeType.sun,
        // pres._shapeType.moon,
        // pres.shapes.ELLIPSE,
        // pres.shapes.TRIANGLE,
        // pres.shapes.DIAMOND,
        // pres.shapes.PENTAGON,
        // pres.shapes.HEXAGON,
        // pres.shapes.OCTAGON,
        // pres.shapes.STAR,
        // pres.shapes.TRAPEZOID,
        // pres.shapes.PARALLELOGRAM,
    ];

    for (let i = 0; i < shapeCount; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const xPos = Math.random() * 9; // Assuming slide width is 10 inches
        const yPos = Math.random() * 5; // Assuming slide height is 5.63 inches
        // const width = 0.1 + Math.random() * .1; // Width between 0.5 and 2 inches
        // const height = 0.1 + Math.random() * .1; // Height between 0.5 and 2 inches
        const width = 0.2; // Width between 0.5 and 2 inches
        const height = 0.2; // Height between 0.5 and 2 inches
        const color = Math.floor(Math.random() * 16777215).toString(16); // Random hex color

        slide.addShape(shapeType, {
            x: xPos,
            y: yPos,
            w: width,
            h: height,
            // fill: { color: color.padStart(6, '0'), transparent: 0 },
            // fill: { color: "5c0129" },
            // line: { color: "70354f", width: 1 }, // Black border
            // line: { color: 'ff9ec8', width: 0.1 },
            line: { color: color.padStart(6, '0'), width: 0.1 },
        });
    }
}

module.exports = addRandomShapes;
