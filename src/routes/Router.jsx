import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignIn from "../pages/signin/SignIn";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import Tasks from "../pages/tasks/Tasks";

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
        element: <Tasks />,
      },
    ],
  },
]);

export default router;
