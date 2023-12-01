// Parse command line file
const test = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const filePath = "./input.text";
import fs from "fs";
const finalFileText = fs.readFileSync(filePath, "utf8");



const getCalibrationDigits = (input: string) => {
  const lines = input.split("\n").map((line) => line.trim()).filter((line) => !!line);
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

const testCalibrationDigits = getCalibrationDigits(test);
const testSum = testCalibrationDigits.reduce((acc, curr) => acc + curr, 0);
console.log(testSum);

// Part 2
// Open and read finalFile and stringify contents
const finalCalibrationDigits = getCalibrationDigits(finalFileText);
const finalSum = finalCalibrationDigits.reduce((acc, curr) => acc + curr, 0);
console.log(finalSum);
