// Parse command line file
const test = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;


const filePath = "./inputs/day1.text";
import fs from "fs";
const finalFileText = fs.readFileSync(filePath, "utf8");

const getCalibrationDigits = (input: string) => {
    const lines = input
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !!line);
    const calibrationDigits = lines
        .map((line) => {
            const firstDigit = line
                .split("")
                .find((char) => !isNaN(parseInt(char, 10)));
            
            const lastDigit = line
                .split("")
                .reverse()
                .find((char) => !isNaN(parseInt(char, 10)));
            return parseInt(`${firstDigit}${lastDigit}`, 10);
        })
        .filter((digit) => !isNaN(digit));
    return calibrationDigits;
};

// Part 1 

const testCalibrationDigits = getCalibrationDigits(test);
const testSum = testCalibrationDigits.reduce((acc, curr) => acc + curr, 0);
console.log(testSum);

// Open and read finalFile and stringify contents
const finalCalibrationDigits = getCalibrationDigits(finalFileText);
const finalSum = finalCalibrationDigits.reduce((acc, curr) => acc + curr, 0);
console.log(finalSum);


// Part 2


const test2 = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

// Regex to replace all spelled out numbers with their digit equivalent
const spelledOutNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];
const spelledOutNumbersRegex = new RegExp(spelledOutNumbers.join("|"), "gi");
const testLines: string[] = [];
const testSpelledOutNumbersReplaced = test2
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
        // Replace 1 match then echeck again
        let newLine = "";
        let match = line.match(spelledOutNumbersRegex);
        console.log(match);
        for (let i = 0, matchIndex = 0; i < line?.length; i++) {
            if (match) {
                let index = line.indexOf(match[matchIndex]);
                if (index === i) {
                    newLine += (spelledOutNumbers.indexOf(match[matchIndex]) + 1).toString();
                    matchIndex++;
                }
            }
            newLine += line[i];
        }
        testLines.push(newLine);
        console.log(line);
        console.log(newLine);
    });
const testCalibrationDigits2 = getCalibrationDigits(testLines.join("\n"));
console.log(testCalibrationDigits2.reduce((acc, curr) => acc + curr, 0));

console.log("-----------")

const lines: string[] = [];
const spelledOutNumbersReplaced = finalFileText
    .split("\n")
    .map((line) => line.trim().toLowerCase())
    .filter((line) => !!line)
    .map((line) => {
        // Replace 1 match then echeck again
        let newLine = "";
        let match = line.match(spelledOutNumbersRegex);
        console.log(match);
        for (let i = 0, matchIndex = 0; i < line?.length; i++) {
            if (match) {
                let index = line.indexOf(match[matchIndex], i);
                if (index === i) {
                    newLine += (spelledOutNumbers.indexOf(match[matchIndex]) + 1).toString();
                    matchIndex++;
                }
            }
            newLine += line[i];
        }
        lines.push(newLine);
        console.log(line);
        console.log(newLine);
    });
    
const finalCalibrationDigits2 = getCalibrationDigits(lines.join("\n"));
console.log(finalCalibrationDigits2.reduce((acc, curr) => acc + curr, 0));
