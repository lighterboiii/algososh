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
  getLastNode: () => IListNode<T> | null;
  getFirstNode: () => IListNode<T> | null;
  getNodeAtIndex: (index: number) => IListNode<T> | null;
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

    let curr = this.head;
    for (let i = 0; i < index - 1 && curr !== null; ++i) {
      if (curr.next) curr = curr.next;
    }
    if (curr === null || curr.next === null) {
      return;
    }
    curr.next = curr.next.next;
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

  getLastNode() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    return node;
  }

  getFirstNode() {
    if (!this.head) {
      return null;
    }
    return this.head;
  }

  getNodeAtIndex(index: number) {
    if (!this.head) {
      return null;
    }
    let node: IListNode<T> | null = this.head;
    let start = 0;
    while (node && start < index) {
      node = node.next;
      start++;
    }
    
    return node && start === index ? node : null;
  }
}

export const linkedList = new LinkedList<IArray>();