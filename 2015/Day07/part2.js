const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    console: false,
});

let circuit = new Object();
let circuitAux = new Object();
const bitNumber = 16;
const numberRegex = /^[0-9]+$/;
const capitalRegex = /^[A-Z]+$/;

readInterface.on("line", (line) => {
    const [signal, wire] = line.split(" -> ");
    circuit[wire] = signal;
});

readInterface.on("close", () => {
    circuit["b"] = 46065;
    console.log(calculateWireSignal("a"))
});

function calculateWireSignal(wire) {
    if (!!circuitAux[wire]) {
        return circuitAux[wire];
    }

    const signal = circuit[wire];
    if (numberRegex.test(signal)) {
        circuitAux[wire] = signal;
        return signal;
    }
    const instructions = signal.split(" ");
    if (instructions.length > 1) {
        let operator = undefined;
        let values = [];
        for (let i = 0; i < instructions.length; i++) {
            if (capitalRegex.test(instructions[i])) {
                operator = instructions[i];
            } else {
                if (numberRegex.test(instructions[i])) {
                    values.push(instructions[i]);
                } else {
                    var aux = calculateWireSignal(instructions[i]);
                    circuitAux[instructions[i]] = aux;
                    values.push(aux);
                }
            }
        }
        return solveOperation(operator, values);
    }

    var aux = calculateWireSignal(instructions[0]);
    circuitAux[instructions[0]] = aux;

    return aux;
}

function solveOperation(operator, values) {
    switch (operator) {
        case "NOT":
            var aux = "";

            for (let i = 0; i < bitNumber; i++) {
                aux += decimalToBinary(values[0]).charAt(i) === "1" ? "0" : "1";
            }

            return parseInt(aux, 2).toString();
        case "AND":
            var aux = "";
            var valueFirst = decimalToBinary(values[0]);
            var valueSecond = decimalToBinary(values[1]);

            for (let i = 0; i < bitNumber; i++) {
                if (valueFirst.charAt(i) === "0") {
                    aux += "0";
                } else {
                    aux += valueSecond.charAt(i) === "1" ? "1" : "0";
                }
            }

            return parseInt(aux, 2).toString();
        case "OR":
            var aux = "";
            var valueFirst = decimalToBinary(values[0]);
            var valueSecond = decimalToBinary(values[1]);

            for (let i = 0; i < bitNumber; i++) {
                if (valueFirst.charAt(i) === "1") {
                    aux += "1";
                } else {
                    aux += valueSecond.charAt(i) === "1" ? "1" : "0";
                }
            }

            return parseInt(aux, 2).toString();
        case "XOR":
            var aux = "";
            var valueFirst = decimalToBinary(values[0]);
            var valueSecond = decimalToBinary(values[1]);

            for (let i = 0; i < bitNumber; i++) {
                aux +=
                    valueFirst.charAt(i) === valueSecond.charAt(i) ? "0" : "1";
            }
            return parseInt(aux, 2).toString();
        case "LSHIFT":
            var valueFirst = decimalToBinary(values[0]);
            var valueSecond = parseInt(values[1]);

            var aux = valueFirst.slice(valueSecond).padEnd(bitNumber, "0");

            return parseInt(aux, 2).toString();
        case "RSHIFT":
            var valueFirst = decimalToBinary(values[0]);
            var valueSecond = parseInt(values[1]);

            var aux = valueFirst.slice(0, -valueSecond).padStart(bitNumber, "0");
            
            return parseInt(aux, 2).toString();
        default:
            console.error("????");
            break;
    }
}

function decimalToBinary(dec) {
    return (dec >>> 0).toString(2).padStart(bitNumber, "0");
}
