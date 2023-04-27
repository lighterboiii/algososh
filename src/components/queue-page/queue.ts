interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  clear: () => void;
  toArray: () => T[] | null[];
  isEmpty: () => void;
  isFull: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: Array<T> = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head];
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
     return this.container[this.head % this.size];
  };

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getSize() {
    return this.size;
  }

  clear() {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }

  toArray() {
    return this.container;
  }

  isEmpty = () => this.length === 0;

  isFull = () => {
    return this.length >= this.size;
  }
};

export const q = new Queue<string>(7);