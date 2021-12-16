import { UserProps } from "./../models/User";
import { User } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <h2>User Detail</h2>
        <div>
          <p>User Name: ${this.model.get("name")}</p>
          <p>User Age: ${this.model.get("age")}</p>
        </div>
      </div>
    `;
  }
}
