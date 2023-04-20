interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  // peak: () => T | null;

  clear: () => void;
  array: () => T[];

  size: number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  }

  pop = (): void => {
    this.container.pop();
  }

  // peak = () => {
  //   if (this.size > 0) {
  //     return this.container[length];
  //   } 
  //   return null;
  // }

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
};