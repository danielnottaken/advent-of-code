const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    console: false,
});

let grid = Array.from(new Array(1000), (_item, _index) => {
    return {
        y: Array.from(new Array(1000), (_item, _index) => false),
    };
});

readInterface.on("line", (line) => {
    const instructions = line.split(" ");
    
    let instruction = undefined;
    let coordinatesStart;
    let coordinatesEnd;

    if (instructions[0] === "toggle") {
        coordinatesStart = instructions[1].split(",");
        coordinatesEnd = instructions[3].split(",");
    } else {
        instruction = instructions[1];
        coordinatesStart = instructions[2].split(",");
        coordinatesEnd = instructions[4].split(",");
    }

    handleInstructions(
        coordinatesStart.map((item) => parseInt(item)),
        coordinatesEnd.map((item) => parseInt(item)),
        instruction
    );
});

readInterface.on("close", () => {
    let total = 0;
    grid.forEach((item) => item.y.forEach((item) => item && total++));
    console.log(total);
});

function handleInstructions(
    coordinatesStart,
    coordinatesEnd,
    instruction = undefined
) {
    for (let i = coordinatesStart[0]; i <= coordinatesEnd[0]; i++) {
        for (let j = coordinatesStart[1]; j <= coordinatesEnd[1]; j++) {
            if (instruction === "on") {
                grid[i].y[j] = true;
            } else if (instruction === "off") {
                grid[i].y[j] = false;
            } else {
                grid[i].y[j] = !grid[i].y[j];
            }
        }
    }
}
