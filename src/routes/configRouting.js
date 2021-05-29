import Home from "../page/Home";
import User from "../page/User";
import Users from "../page/Users";
import Error404 from "../page/Error404";

const configRouting = [
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/profile/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];

export default configRouting;
