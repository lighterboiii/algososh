import { ElementStates } from "../../types/element-states";

export interface ISort {
  letter: string;
  state: ElementStates;
}

export const sort = (array: Array<ISort>, firstIndex: number, secondIndex: number) => {
  return ([array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]]);
};