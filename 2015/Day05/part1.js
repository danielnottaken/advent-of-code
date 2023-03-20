const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    console: false
})

let niceTotal = 0;
const niceRegex = /^(?=.*[aeiou].*[aeiou].*[aeiou])(?=.*(\w)\1)(?!.*(?:ab|cd|pq|xy)).*$/i;

readInterface.on("line", (line) => {
    if (niceRegex.test(line)) {
        niceTotal++;
    }
})

readInterface.on("close", () => {
    console.log(niceTotal);
})