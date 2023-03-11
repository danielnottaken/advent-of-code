const fs = require("fs");

const data = fs.readFileSync("input.txt").toString();

let currentCoordinates = [0, 0];
let allCoordinates = [[0, 0]];

for (let i = 0; i < data.length; i++) {
    switch (data[i]) {
        case "^":
            currentCoordinates[0]++;
            break;
        case "v":
            currentCoordinates[0]--;
            break;
        case ">":
            currentCoordinates[1]++;
            break;
        case "<":
            currentCoordinates[1]--;
            break;
        default:
            break;
    }
    if (
        !allCoordinates.find((coordinate) =>
            coordinate.every(
                (item, index) => item === currentCoordinates[index]
            )
        )
    ) {
        allCoordinates.push([...currentCoordinates]);
    }
}

console.log(allCoordinates.length);
