import { createBrowserRouter } from "react-router";

import Homepage from "../pages/homepage";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import ProductPage from "@/pages/product-page";
import DetailProductPage from "../pages/product-detail-page";
import CartPage from "../pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import OrderHistoryPage from "@/pages/order-history-page";
import ProtectedRoute from "@/components/protected-route";
import WishlistPage from "@/pages/wishlist-page";

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
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <OrderHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <WishlistPage />
      </ProtectedRoute>
    ),
  },
]);

export default routerList;
