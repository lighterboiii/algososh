interface ILinkedListNode<T> {
  value: T;
  next: ILinkedListNode<T> | null;
}
class ListNode<T> implements ILinkedListNode<T> {
  public value: T;
  public next: ILinkedListNode<T> | null;

  constructor(value: T, next?: ILinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
};

interface ILinkedList<T> {
  length: number;
  prepend(node: T): void;
  append(node: T): void;
  removeHead: () => void;
  removeTail: () => void;
  addAtIndex(node: T, index: number): void;
  removeAtIndex(index: number): void;
  toArray(): T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private size: number;

  constructor(array: Array<T>) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (array && array.length > 0) {
      this.fillList(array);
    }
  }

  protected fillList(array: Array<T>) {
    array.forEach((el) => this.append(el));
  }

  private isEmpty() {
    return this.size === 0;
  }

  prepend(node: T) {
    const newNode = new ListNode(node);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    }
    if (this.head) {
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
    }
  }

  append(node: T) {
    const newNode = new ListNode(node);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    }
    if (this.tail) {
      newNode.next = this.tail;
      this.tail = newNode;
      this.size++;
    }
  }

  addAtIndex(node: T, index: number): void {
    if (index < 0 || index > this.size) {
      alert('Enter a valid index');
      return;
    } else {
      const newNode = new ListNode(node);

      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        let previous = null;
        let currIndex = 0;

        while (currIndex < index) {
          previous = current;
          current = current!.next;
          currIndex++;
        }

      previous!.next = newNode;
      newNode.next = current;
      }

      this.size++;
    }
  }

  removeHead() {
    if (!this.head) {
      return null;
    }
    if (this.head && this.head.next) {
      this.head = this.head.next;
      this.size--;
    }
  }

  removeTail() {
    if (!this.head || !this.head.next) {
      return null
    }

    let current = this.head;
    let prev = null;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    prev!.next = null;
  }

  removeAtIndex(index: number) {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let prev = this.head;
    let current = this.head;
    let i = 0;

    while (i !== index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }

      i++;
    }

    if (prev && current) {
      if (current === this.head) {
        this.head = this.head.next;
      } else if (current === this.tail) {
        prev.next = null;
        this.tail = prev;
      } else {
        prev.next = current.next;
      }
    }

    this.size--;
  }

  toArray() {
    let array: T[] = [];
    let curr = this.head;

    if (curr) {
      while (curr.next) {
        array.push(curr.value);
        curr = curr?.next;
      }
      array.push(curr.value);
    }
    return array;
  }


  get length() {
    return this.size;
  }
};