import { input } from "./input";

const getNumbers = (input: string) => {
  let numbers: { number: number; start: number; end: number }[] = [];
  const numbersInInput = input.matchAll(/\d+/g);
  for (let number of numbersInInput) {
    numbers.push({
      number: Number(number[0]),
      start: number.index!,
      end: number.index! + number[0].length - 1,
    });
  }
  return numbers;
}

const getAsteriskIndexes = (input: string) => {
  return [...input.matchAll(/\*/g)].map((asterisk) => {return asterisk.index})
}

const getAdjacentNumbers = (input: string[]) => {
  let sum: number = 0;

  input.forEach((line, lineIndex) => {
    const asterisksAt = getAsteriskIndexes(line);

      asterisksAt.forEach((asteriskIndex) => {
        let adjacentNumbers: number[] = [];

        // get numbers on prev line
        if (lineIndex > 0) {
        const numbersOnPrevLine = getNumbers(input[lineIndex-1]);
        numbersOnPrevLine.forEach((number) => {
          for(let i = number.start-1;i < number.end+2; i++) {
            if(asteriskIndex === i) { adjacentNumbers.push(number.number)};
          }
        })
      }

        // get numbers on same line
        const numbersOnSameLine = getNumbers(line);
        numbersOnSameLine.forEach((number) => {
          for(let i = number.start-1;i < number.end+2; i++) {
            if(asteriskIndex === i) { adjacentNumbers.push(number.number)};
          }
        })

        //get numbers on next line 
        if(lineIndex+1 < input.length) {
        const numbersOnNextLine = getNumbers(input[lineIndex+1]);
        numbersOnNextLine.forEach((number) => {
          for(let i = number.start-1;i < number.end+2; i++) {
            if(asteriskIndex === i) { adjacentNumbers.push(number.number)};
          }
        })
      }

      if(adjacentNumbers.length > 1) {
       sum += (adjacentNumbers[0] * adjacentNumbers[1])
      }
      })
    })
  
  return sum;
}

console.log(getAdjacentNumbers(input))