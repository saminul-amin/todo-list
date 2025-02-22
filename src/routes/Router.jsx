import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignIn from "../pages/signin/SignIn";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import Tasks from "../pages/tasks/Tasks";
import Todo from "../pages/tasks/Todo";
import InProgress from "../pages/tasks/InProgress";
import Done from "../pages/tasks/Done";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "tasks",
        element: <PrivateRoute><Tasks /></PrivateRoute>,
        children: [
          {
            path: "todo",
            element: <Todo />,
          },
          {
            path: "in-progress",
            element: <InProgress />,
          },
          {
            path: "done",
            element: <Done />,
          },
        ],
      },
    ],
  },
]);

export default router;
