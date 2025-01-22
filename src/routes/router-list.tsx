import { createBrowserRouter } from "react-router";

import Homepage from "../pages/homepage";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";

const routerList = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default routerList;
