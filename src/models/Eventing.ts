type Callabck = () => void;

export class Eventing {
  events: { [key: string]: Callabck[] } = {};

  on = (eventName: string, callback: Callabck): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlres = this.events[eventName];
    if (!handlres || handlres.length === 0) {
      return;
    }
    handlres.forEach((callback) => {
      callback();
    });
  };
}
