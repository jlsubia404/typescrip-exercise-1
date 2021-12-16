import { User, UserProps } from "./models/User";
import { Collection } from "./models/Collection";
import { UserList } from "./views/UserList";

const users = new Collection("http://localshot:3000/users", (json: UserProps) =>
  User.buildUser(json)
);
users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
