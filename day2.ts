// Parse command line file
const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const filePath = "./inputs/day2.text";
import fs from "fs";
const finalFileText = fs.readFileSync(filePath, "utf8");

const AVAILABLE_CUBES: [number, string][] = [
    [12, "red"],
    [13, "green"],
    [14, "blue"],
];

function parseIntoLines(input: string) {
    return input
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !!line);
}

function splitGameNumber(line: string): [number, string] {
    const gameTitle = line.split(":")[0];
    const gameNumber = parseInt(gameTitle.split(" ")[1]);
    return [gameNumber, line.split(":")[1].trim()];
}

function splitIntoSets(line: string) {
    return line
        .split(";")
        .map((set) => set.trim())
        .filter((set) => !!set);
}

function getCubeNumAndColor(cube: string): [number, string] {
    const number = parseInt(cube.split(" ")[0]);
    const color = cube.split(" ")[1];
    return [number, color];
}

function sumMatchingCubes(acc: [number, string][], curr: [number, string]) {
    const matchingCube = acc.find((cube) => cube[1] === curr[1]);
    if (matchingCube) {
        matchingCube[0] += curr[0];
    } else {
        acc.push(curr);
    }
    return acc;
}

function reduceToMinCubePerColor(gameAcc: [number, string][], set: [number, string][]): [number, string][] {
    return set.reduce((acc, curr) => {
        const matchingCube = acc.find((cube) => cube[1] === curr[1]);
        if (matchingCube) {
            matchingCube[0] = Math.max(matchingCube[0], curr[0]);
        } else {
            acc.push(curr);
        }
        return acc;
    }, gameAcc);
}

function checkIfSetIsViable(set: string) {
    return set
        .split(",")
        .map((cube) => cube.trim())
        .filter((cube) => !!cube)
        .map(getCubeNumAndColor)
        .reduce(sumMatchingCubes, [])
        .reduce((acc, cube) => {
            if (!acc) {
                return false;
            }
            const [number, color] = cube;
            const availableCube = AVAILABLE_CUBES.find(
                (availableCube) =>
                    availableCube[1].toLowerCase() === color.toLowerCase()
            );
            if (!availableCube) {
                throw new Error(`No available cube found for color ${color}`);
            }

            return Boolean(availableCube[0] >= number);
        }, true);
}

function getAllViableGames(input: string): number[] {
    return parseIntoLines(input)
        .map(splitGameNumber)
        .filter((game) =>
            splitIntoSets(game[1]).every((set) => checkIfSetIsViable(set))
        )
        .map((game) => game[0]);
}

function setToColors(set: string) {
    return set
        .split(",")
        .map((cube) => cube.trim())
        .filter((cube) => !!cube)
        .map(getCubeNumAndColor)
        .reduce(sumMatchingCubes, []);
}

function getMinNumCubesPerColor(input: string) {
    return parseIntoLines(input)
        .map(splitGameNumber)
        .map((game) => {
            return splitIntoSets(game[1]).map(setToColors)
        })
        .map((game) => game.reduce(reduceToMinCubePerColor, []))
        .reduce((acc, game) => {
            let power = 1;
            game.forEach(([number, color]) => {
                power *= number
            });
            return acc + power;
        }, 0);
}

// Part 1
// Open and read finalFile and stringify contents
(function () {
    console.log(
        getAllViableGames(finalFileText).reduce((acc, curr) => acc + curr, 0)
    );
})();

// Part 2
(function () {
    const wowFuckThis = getMinNumCubesPerColor(finalFileText);

    console.log(wowFuckThis);
})();
