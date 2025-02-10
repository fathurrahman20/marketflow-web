import useCart from "@/hooks/useCarts";
import { formatIdr } from "@/lib/utils";
// import { TrashIcon } from "@heroicons/react/20/solid";
// import { Link } from "react-router";
import CartProduct from "../cart/cart-product";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ShoppingCart } from "lucide-react";
import Spinner from "../ui/spinner-loading";
import { Button } from "../ui/button";

export default function OrderSummary({ isPending }: { isPending: boolean }) {
  const { data, isLoading } = useCart();
  const totalPrice = data?.data?.items?.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        {!isLoading && data?.data.items.length === 0 && (
          <div className="mx-4 my-4">
            <Alert className="mx-auto md:text-center">
              <ShoppingCart className="w-4 h-4 md:hidden" />
              <AlertTitle>Your cart is currently empty</AlertTitle>
              <AlertDescription>
                Please add items before proceeding.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <h3 className="sr-only">Items in your cart</h3>
        <div className="px-5">
          <ul role="list" className="divide-y divide-gray-200">
            {data?.data.items.map((item) => (
              <CartProduct item={item} key={item.id} />
            ))}
          </ul>
        </div>

        {totalPrice !== 0 && (
          <>
            <dl className="px-4 py-6 space-y-6 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatIdr(totalPrice || 0)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">Rp 30.000</dd>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  {formatIdr(totalPrice ? totalPrice + 30000 : 0)}
                </dd>
              </div>
            </dl>

            <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                {isPending ? (
                  <>
                    <Spinner />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
