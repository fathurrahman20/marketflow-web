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
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default routerList;
