import { ElementStates } from "../../types/element-states";
import { linkedList } from "./LinkedList";

export const generateArray = () => {
  const size = Math.floor(Math.random() * (6 - 2)) + 2;
  const array = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push(randomNumber);
  }

  return array;
};

export const setLinkedList = () => {
  const array = generateArray().map(el => String(el));
  array.forEach(el => {
    linkedList.append({ value: el, state: ElementStates.Default })
  })
};