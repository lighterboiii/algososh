import { ElementStates } from "../../types/element-states";


export interface IArray {
  value: string;
  state: ElementStates;
}

export const generateArray = () => {
  const size = Math.floor(Math.random() * (6 - 2)) + 2;
  const array = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push({ value: randomNumber.toString(), state: ElementStates.Default });
  }

  return array;
};