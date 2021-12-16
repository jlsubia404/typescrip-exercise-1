import { AxiosPromise, AxiosResponse } from "axios";

export interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("changed");
  }
  fecth(): void {
    const id = this.get("id");
    if (id) {
      this.sync.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      });
    } else {
      throw new Error("Caanot fetch withour an id");
    }
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then(() => {
        this.events.trigger("saved");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
