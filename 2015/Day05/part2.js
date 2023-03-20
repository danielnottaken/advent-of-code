const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    console: false
})

let niceTotal = 0;
const niceRegex1 = /([a-z][a-z]).*\1/;
const niceRegex2 = /([a-z])[a-z]\1/;

readInterface.on("line", (line) => {
    if (niceRegex1.test(line) && niceRegex2.test(line)) {
        niceTotal++;
    }
})

readInterface.on("close", () => {
    console.log(niceTotal);
})