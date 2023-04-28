import { ElementStates } from "../../types/element-states";

export interface ISort {
  value: number;
  state: ElementStates;
};

export const sort = (array: Array<ISort>, firstIndex: number, secondIndex: number) => {
  return ([array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]]);
};

export const randomArr = () => {
  const size = Math.floor(Math.random() * (17 - 3)) + 3;
  const array: Array<ISort> = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push({ value: randomNumber, state: ElementStates.Default });
  }

  return array;
};