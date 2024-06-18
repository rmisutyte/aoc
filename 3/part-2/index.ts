import { input } from "./input";
type NumberData = { 
  number: number;
  start: number;
  end: number 
}

const getNumbers = (input: string) => {
  let numbers: NumberData[] = [];
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

const getAdjacentNumbersForAsterisk = (asteriskIndex: number, numbers: NumberData[]) => {
  return numbers.filter((number) => {
    for(let i = number.start-1;i < number.end+2; i++) {
      if (asteriskIndex === i) {
        return true;
      }
    }
    return false;
  })
}

const getSumOfGearRations = (input: string[]) => {

  const gearRations = input.map((line, lineIndex) => {
    const asterisksAt = getAsteriskIndexes(line);

    if (asterisksAt.length > 0) {
      const adjacentNumbersForAsterisk = asterisksAt.map((asteriskIndex) => {
        const allSurroundingNumbers = [input[lineIndex-1], line, input[lineIndex+1]].filter((line) => line !== undefined).map((line) => {
          return getNumbers(line)
        }).filter((numbers) => numbers.length > 0).flat()

      const adjacentNumbers = getAdjacentNumbersForAsterisk(asteriskIndex!, allSurroundingNumbers)
      return adjacentNumbers;
      })

      return adjacentNumbersForAsterisk;
    } else {
      return undefined;
    }
    }).filter(el => el !== undefined).flat().filter((el) => {
      return el!.length === 2;
    })

    const sum = gearRations.reduce((acc, current) => {
      acc += (current![0].number * current![1].number)
      return acc;
    }, 0)
  
  return sum;
}

console.log(getSumOfGearRations(input))