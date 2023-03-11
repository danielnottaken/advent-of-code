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

    total += l * w * 2;
    total += l * h * 2;
    total += w * h * 2;
    total += Math.min(l * w, l * h, w * h);
});

readInterface.on("close", () => {
    console.log(total);
});
