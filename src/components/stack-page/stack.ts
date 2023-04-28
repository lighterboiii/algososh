interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  array: () => T[];
  index: number;
  size: number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  }

  pop = () => {
    this.container.pop();
  }

  peak = () => {
    if (this.size > 0) {
// eslint-disable-next-line
      return this.container[length - 1]; 
    } 
    return null;
  }

  clear = (): void => {
    if (this.size > 0) {
      this.container = [];
    } 
  }

  array = () => {
   return this.container;
  }

  get size() {
    return this.container.length;
  }

  get index() {
    return this.size - 1;
  }
};