import fs from 'fs'
export const stat = () => {
    const isFileAdreadyExists = fs.existsSync('./hello.txt')
    if (!isFileAdreadyExists) {
        fs.writeFileSync("./hello.txt", "Hello World")
    } else {
        console.log("File already exists");
    }

    fs.stat("./hello.txt", (err, stats) => {
        if (err) {
            console.log(err);
        }
        if (stats.isFile()) {
            fs.readFile("./hello.txt", (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                console.log(Array.from(data.entries()).map(item => String.fromCharCode(item[1])).join(""));
                console.log(String.fromCharCode(...data));
                console.log(...data);
            })
            console.log("File");
        }
        console.log(stats, stats.size, stats.isFile(), stats.isDirectory(), stats.isBlockDevice(), stats.isCharacterDevice(), stats.isSymbolicLink(), stats.isFIFO(), stats.isSocket(), stats.atime, stats.blksize, stats.mode, stats.blocks);
    })
}