const fs = require("fs");

const data = fs.readFileSync("input.txt").toString();

let floor = 0;

for (let i = 0; i < data.length; i++) {
    data[i] === "(" ? floor++ : floor--;
    if (floor === -1) {
        console.log(i + 1);
        break;
    }
}
