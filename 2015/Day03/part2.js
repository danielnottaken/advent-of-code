const fs = require("fs");

const data = fs.readFileSync("input.txt").toString();

let currentCoordinates = [0, 0];
let currentCoordinates2 = [0, 0];
let allCoordinates = [[0, 0]];

for (let i = 0; i < data.length; i += 2) {
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
    switch (data[i + 1]) {
        case "^":
            currentCoordinates2[0]++;
            break;
        case "v":
            currentCoordinates2[0]--;
            break;
        case ">":
            currentCoordinates2[1]++;
            break;
        case "<":
            currentCoordinates2[1]--;
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
    if (
        !allCoordinates.find((coordinate) =>
            coordinate.every(
                (item, index) => item === currentCoordinates2[index]
            )
        )
    ) {
        allCoordinates.push([...currentCoordinates2]);
    }
}

console.log(allCoordinates.length);
