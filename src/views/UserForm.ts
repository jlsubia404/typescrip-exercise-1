import { User, UserProps } from "./../models/User";
import { View } from "./View";
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.change-name": this.onSetNameClick,
      "click:.set-age": this.onSetAgeClick,
    };
  }

  onSetNameClick = (): void => {
    const elm = this.parent.querySelector("input");
    if (elm) {
      const name = elm.value;
      this.model.set({ name });
    }
  };

  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  template(): string {
    return `<div>
      <h1>User Form</h1>
      <div>User Name: ${this.model.get("name")}</div>
      <div>User age: ${this.model.get("age")}</div>
      <input/>
      <button class="change-name">CHange name</button>
      <button class="set-age">Set random age</button>
      </div>`;
  }
}
