const fs = require("fs");

const data = fs.readFileSync("input.txt").toString();

let currentCoordinates = [0, 0];
let currentCoordinates2 = [0, 0];
let allCoordinates = [[0, 0]];

for (let i = 0; i < data.length; i += 2) {
    currentCoordinates = handleCoordinateInstructions(data[i], currentCoordinates);
    currentCoordinates2 = handleCoordinateInstructions(data[i + 1], currentCoordinates2);

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

function handleCoordinateInstructions(instruction, coordinates) {
    switch (instruction) {
        case "^":
            return [coordinates[0]+1, coordinates[1]];
        case "v":
            return [coordinates[0]-1, coordinates[1]];
        case ">":
            return [coordinates[0], coordinates[1]+1];
        case "<":
            return [coordinates[0], coordinates[1]-1];
        default:
            break;
    }
}