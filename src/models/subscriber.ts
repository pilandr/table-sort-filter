import { TableMainDataKey } from "components/Table/Table.types";

interface Observer<T> {
  update: (value: T) => void;
}

export class SubjectObserver<T> {
  constructor() {
    this.observers = [];
  }

  observers: Observer<T>[];

  subscribe(observer: Observer<T>) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: T) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export const sortObserver = new SubjectObserver<TableMainDataKey>();
