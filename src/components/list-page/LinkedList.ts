import { ElementStates } from "../../types/element-states";

export interface IArray {
  value: string;
  state: ElementStates;
}

export interface IListNode<T> {
  value: T;
  next: IListNode<T> | null;
};

class ListNode<T> implements IListNode<T> {
  value: T;
  next: ListNode<T> | null;
  
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

interface ILinkedList<T> {
  append: (node: T) => void;
  prepend: (node: T) => void;
  
  removeHead: () => void;
  removeTail: () => void;

  addAtIndex: (node: T, index: number) => void;
  removeAtIndex: (index: number) => void;

  toArray: () => IListNode<T>[];
  getSize: () => number;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(node: T) {
    const newNode = new ListNode(node);

    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  append(node: T) {
    const newNode = new ListNode(node);

    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }

    let curr = this.head;
    while (curr.next !== null) {
      curr = curr.next;
    }
    curr.next = newNode;
    this.size++;
  }

  addAtIndex(node: T, index: number) {
    const newNode = new ListNode(node);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let curr = this.head;
    for (let i = 0; i < index - 1 && curr !== null; ++i) {
      curr = curr.next;
    }
    if (curr === null) {
      return;
    }
    newNode.next = curr.next;
    curr.next = newNode;
    this.size++;
  }

  removeHead() {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.next) {
      this.head = this.head.next;
      this.size--;
    }
  }

  removeTail() {
    if (this.head === null) {
      return;
    }

    if (this.head.next === null) {
      this.head = null;
      return;
    }

    let curr = this.head;
    while (curr.next != null && curr.next.next != null) {
      curr = curr.next;
    }
    curr.next = null;
    this.size--;
  }

  removeAtIndex(index: number) {
    if (this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let cur = this.head;
    for (let i = 0; i < index - 1 && cur !== null; ++i) {
      if (cur.next) cur = cur.next;
    }
    if (cur === null || cur.next === null) {
      return;
    }
    cur.next = cur.next.next;
    this.size--;
  }

  toArray() {
    const array = [];
    let curr = this.head;
    while (curr) {
      array.push(curr);
      curr = curr.next;
    }
    return array;
  }

  getSize(): number {
    return this.size;
  }
}

export const linkedList = new LinkedList<IArray>();