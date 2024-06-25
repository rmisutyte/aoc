import { input } from "./input";

const getTotalPoints = (input: string[]) => {
  let totalPoints = 0;
  input.forEach((element: string) => {
    const winningNumbers = extractWinningNumbers(element);
    const elfsNumbers = extractElfsNumbers(element);
    const matchedNumbers = winningNumbers?.filter((winningNumber) => {
      return elfsNumbers?.includes(winningNumber);
    });
    totalPoints +=
      matchedNumbers && matchedNumbers.length > 0
        ? doubleTheValue(1, matchedNumbers.length - 1)
        : 0;
  });

  return totalPoints;
};

const extractWinningNumbers = (input: string) => {
  const winningNumberMatch = input.match(/:[\d\s]+\|/);
  let winningNumbers;

  if (winningNumberMatch !== null) {
    winningNumbers = winningNumberMatch[0]
      .replace(/:/, "")
      .replace(/\|/, "")
      .replace(/\s\s/g, " ")
      .trim()
      .split(" ");
  }

  return winningNumbers;
};

const extractElfsNumbers = (input: string) => {
  const elfsNumberMatch = input.match(/\|[\d\s]+$/);
  let elfsNumbers;

  if (elfsNumberMatch !== null) {
    elfsNumbers = elfsNumberMatch[0]
      .replace(/\|/, "")
      .replace(/\s\s/g, " ")
      .trim()
      .split(" ");
  }

  return elfsNumbers;
};

const doubleTheValue = (value: number, times: number): number => {
  let result = value;
  for (let i = 0; i < times; i++) {
    result *= 2;
  }
  return result;
};

console.log(getTotalPoints(input));
