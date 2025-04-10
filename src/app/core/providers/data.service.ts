import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  readonly #data = signal<T | null>(null);

  get data(): T | null {
    return this.#data();
  }

  set data(value: T) {
    this.#data.set(value);
  }
}
