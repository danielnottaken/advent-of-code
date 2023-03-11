const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
let data = "";

readStream.on("data", (chunk) => {
    data += chunk;
});

readStream.on("end", () => {
    let floor = 0;
    for (const el of data) {
        el === "(" ? floor++ : floor--;
    }
    
    console.log(floor);
});
