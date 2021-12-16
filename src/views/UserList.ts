import { UserProps } from "./../models/User";
import { User } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }

  template(): string {
    return `
        <div>
            <h2>User List</h2>
            <div class="user-list"></div>
        </div>
        `;
  }
}
