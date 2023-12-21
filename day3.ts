const sample = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const filePath = "./inputs/day3.text";
import fs from "fs";
const finalFileText = fs.readFileSync(filePath, "utf8");

function parseIntoGrid(input: string) {
    return input.split("\n").map((line) => {
        return line.split("");
    });
}

interface Coord {
    x: number;
    y: number;
}

interface NumberInGrid {
    startX?: number;
    endX?: number;
    y: number;
}

function findPartNumbers(input: string[][]) {
    const partNumbers: number[] = [];
    input.forEach((line, yIndex, source) => {
        const possibleNumber: NumberInGrid = {
            y: yIndex,
        };
        line.forEach((char, xIndex) => {
            if (parseInt(char)) {
                if (
                    possibleNumber.startX !== undefined &&
                    possibleNumber.endX !== undefined
                )
                    possibleNumber.endX++;
                else {
                    possibleNumber.startX = xIndex;
                    possibleNumber.endX = xIndex;
                }
                return;
            }

            if (
                possibleNumber.startX !== undefined &&
                checkForNearbySymbol(possibleNumber, source)
            ) {
                partNumbers.push(partNumberToInt(possibleNumber, line));
            }

            possibleNumber.startX = undefined;
            possibleNumber.endX = undefined;
        });
    });
    return partNumbers;
}

function checkForNearbySymbol(number: NumberInGrid, grid: string[][]) {
    if (number.startX === undefined || number.endX === undefined) return false;
    // Check all positions
    const topLeft: Coord = {
        x: number.startX - 1 >= 0 ? number.startX - 1 :  number.startX,
        y: number.y - 1 >= 0 ? number.y - 1 : number.y,
    };

    const bottomRight: Coord = {
        x: number.endX + 1 <= grid[0].length - 1 ? number.endX + 1 : number.endX,
        y: number.y + 1 <= grid.length - 1 ? number.y + 1 : number.y
    }

    for (let x = topLeft.x; x <= bottomRight.x; x++) {
        for (let y = topLeft.y; y <= bottomRight.y; y++) {
            if (grid.length <= y || grid[0].length <= x) {
                throw new Error("you fucked up");
            }
            
            // console.log(grid);
            const char = grid[y][x];
            // console.log(grid);
            if (char !== undefined &&  !isNumber(char) && !isDot(char)) {
                return true;
            }

        }
    } 

    return false;
}

function isNumber(char: string) {
    return !isNaN(parseInt(char));
}

function isDot(char) {
    return char === ".";
}

function partNumberToInt(number: NumberInGrid, line: string[]) {
    if (number.startX === undefined || number.endX === undefined) return 0;

    const numberArray = line.filter((char, index) => {
        if (number.startX === undefined || number.endX === undefined) return false;

        const validStart = number.startX <= index;
        const validEnd = number.endX >= index;
        return validStart && validEnd;
    });

    return parseInt(numberArray.join("")) || 0;
}

// Part 1
(function () {
    const sampleGrid = parseIntoGrid(sample);
    const partNumbers = findPartNumbers(sampleGrid);

    console.log(partNumbers.reduce((sum, val) => sum + val, 0))

    const finalGrid = parseIntoGrid(finalFileText);
    const finalPartNumbers = findPartNumbers(finalGrid);

    console.log(finalPartNumbers.reduce((sum, val) => sum + val, 0))
})();
