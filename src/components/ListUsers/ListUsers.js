import React from "react";
import { isEmpty } from "lodash";
import User from "./User";

import "./ListUsers.scss";
export default function ListUsers(props) {
  const { users } = props;

  if (isEmpty(users)) return <h2>No hay resultados</h2>;

  return (
    <ul className="list-users">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
}
