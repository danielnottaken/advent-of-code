const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    console: false,
});

let total = 0;
readInterface.on("line", (line) => {
    const data = line.split("x");
    const [l, w, h] = data.map((item) => parseInt(item));

    const [smallest, middle] = [l, w, h]
        .sort(function (a, b) {
            return a - b;
        })
        .slice(0, 2);
    total += l * w * h;
    total += 2 * smallest + 2 * middle;
});

readInterface.on("close", () => {
    console.log(total);
});
