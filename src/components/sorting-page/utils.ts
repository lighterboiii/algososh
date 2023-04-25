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

// export const selectionSort = (array: Array<number>) => {
// const length = array.length;
// for (let i = 0; i < length - 1; i++) {
//   let minIndex = i;
//   for (let j = i + 1; j < length; j++) {
//     if (array[j] < array[minIndex]) {
//       minIndex = j;
//     }
//   }
//   if (minIndex !== i) {
//     [array[i], array[minIndex]] = [array[minIndex], array[i]];
//   }
// }
// return array;
// };

// export const bubbleSort = (array: Array<number>) => {
//   const length = array.length;
//   for (let i = 0; i < length - 1; i++) {
//     for (let j = 0; j < length - i - 1; j++) {
//       if (array[j] > array[j + 1]) {
//         [array[j], array[j + 1]] = [array[j + 1], array[j]];
//       }
//     }
//   }
// };