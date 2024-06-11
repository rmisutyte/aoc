import { input } from "./3-input.ts";

const getNumbers = (input: string) => {
  let numbers: { number: string; start: number; end: number }[] = [];
  const numbersInInput = input.matchAll(/\d+/g);

  for (let number of numbersInInput) {
    numbers.push({
      number: number[0],
      start: number.index!,
      end: number.index! + number[0].length - 1,
    });
  }

  return numbers;
};

const isSymbol = (character: string) => {
  const reg = new RegExp(/[^\d.]/g);
  return character ? reg.test(character) : false;
};

const getSum = (input: string[]) => {
  let sum = 0;

  input.forEach((line: string, lineIndex: number) => {
    const numbers = getNumbers(line);

    numbers.forEach((number) => {
      // check same line
      if (isSymbol(line[number.start - 1]) || isSymbol(line[number.end + 1])) {
        sum += Number(number.number);
      }
      // check prev line
      for (let i = number.start - 1; i <= number.end + 1; i++) {
        if (input[lineIndex - 1] && isSymbol(input[lineIndex + -1][i])) {
          sum += Number(number.number);
        }
      }
      // check next line
      for (let i = number.start - 1; i <= number.end + 1; i++) {
        if (input[lineIndex + 1] && isSymbol(input[lineIndex + 1][i])) {
          sum += Number(number.number);
        }
      }
    });
  });

  return sum;
};

console.log(getSum(input));
