import { createBrowserRouter } from "react-router";

import Homepage from "../pages/homepage";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import ProductPage from "@/pages/product-page";
import DetailProductPage from "../pages/product-detail-page";
import CartPage from "../pages/cart-page";

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
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/products/:slug",
    element: <DetailProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

export default routerList;
