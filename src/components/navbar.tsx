import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";
import APIClient from "@/service/api-client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useCart from "@/hooks/useCarts";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { data } = useCart();

  const totalCart = data?.data?.items?.length || 0;

  const userLogut = new APIClient("/auth/me");
  const handleLogout = () => {
    userLogut.delete({
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    navigate("/signin");
  };

  function getInitials(name: string) {
    const parts = name?.trim().split(/\s+/);

    if (parts?.length > 1) {
      return parts[0][0] + parts[1][0];
    } else {
      return name?.slice(0, 2);
    }
  }
  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex items-center shrink-0">
              <Link to="/">
                <h2 className="font-bold">Marketflow</h2>
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <Link
                to="/"
                className={`inline-flex items-center ${
                  pathname === "/"
                    ? "border-[#DB4444] border-b-2 text-gray-900"
                    : ""
                }  px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-[#E07575] hover:border-b-2`}>
                Home
              </Link>
              <Link
                to="/products"
                className={`inline-flex items-center ${
                  pathname === "/products"
                    ? "border-[#DB4444] border-b-2 text-gray-900"
                    : ""
                }  px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-[#E07575] hover:border-b-2`}>
                Product
              </Link>
              <Link
                to="/"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-[#E07575] hover:text-gray-700 hover:pb-1">
                About
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-[#E07575] hover:text-gray-700 hover:pb-1">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
            <div className="flex items-center gap-x-4 lg:max-w-xs">
              <Input
                right={<SearchIcon />}
                placeholder="What are you looking for?"
                className="hidden md:flex"
              />
              <Link to="/wishlist">
                <Heart className="hidden md:block" />
              </Link>
              <Link to="/cart">
                <div className="relative inline-flex">
                  <ShoppingCart className="hidden md:block" />
                  <div className="absolute items-center justify-center hidden w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full md:inline-flex -top-2 -end-2 dark:border-gray-900">
                    {totalCart}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md group hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            {/* Profile dropdown */}
            {user && (
              <Menu as="div" className="relative ml-4 shrink-0">
                <div>
                  <MenuButton className="relative flex text-sm bg-white rounded-full ring-2 ring-red-400 focus:outline-none hover:ring-2 hover:ring-red-300 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <MenuItem>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/signin"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block py-2 pl-3 pr-4 text-base ${
              pathname === "/"
                ? "border-l-4 font-medium text-indigo-700 border-indigo-500 bg-indigo-50"
                : " text-gray-600"
            } `}>
            Home
          </Link>
          <Link
            to="/products"
            className={`block py-2 pl-3 pr-4 text-base ${
              pathname.includes("/products")
                ? " border-l-4 font-medium text-indigo-700 border-indigo-500 bg-indigo-50"
                : " text-gray-600"
            } `}>
            Product
          </Link>
          <Link
            to="/"
            className={`block py-2 pl-3 pr-4 text-base ${
              pathname === "/about"
                ? "border-l-4 font-medium text-indigo-700 border-indigo-500 bg-indigo-50"
                : " text-gray-600"
            } `}>
            About
          </Link>
          {!user && (
            <Link
              to="/signup"
              className="block py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800">
              Sign Up
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user && (
            <>
              <div className="flex items-center px-4">
                <div>
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  Your Profile
                </Link>
                <Link
                  to="/wishlist"
                  className={`block px-4 py-2 text-base hover:bg-gray-100 hover:text-gray-800 ${
                    pathname === "/wishlist"
                      ? "border-l-4 font-medium text-indigo-700 border-indigo-500 bg-indigo-50"
                      : " text-gray-500"
                  } `}>
                  Wishlist
                </Link>
                <Link to="/cart" className="px-4 pt-10">
                  <div className="relative inline-flex">
                    <ShoppingCart className="block md:hidden" />
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full md:hidden -top-2 -end-2 dark:border-gray-900">
                      {totalCart}
                    </div>
                  </div>
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  Settings
                </Link>
                <Link
                  to="/signin"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  Sign out
                </Link>
              </div>
            </>
          )}
          {!user && (
            <Link
              to="/signin"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
              Sign In
            </Link>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
