"use client";

import useTitlePage from "@/hooks/useTitlePage";
import CartOrderSummary from "@/components/cart/cart-order-summary";
import CartProduct from "@/components/cart/cart-product";
import Layout from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import useCart from "@/hooks/useCarts";
import { ShoppingCart } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CartPage() {
  useTitlePage("Cart");
  const { data, isLoading } = useCart();
  const totalPrice = data?.data?.items?.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  return (
    <Layout>
      <div className="bg-white">
        <main>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-4xl pt-16 mx-auto">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Shopping Cart
              </h1>

              <form className="mt-12">
                <section aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>

                  <ul
                    role="list"
                    className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    {isLoading && (
                      <div className="flex flex-row py-5">
                        <Skeleton className="h-[100px] w-[110px] my-auto" />
                        <div className="flex flex-row items-center justify-between w-full px-5">
                          <div className="flex flex-col justify-center gap-y-16">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                          <div className="flex flex-col justify-center gap-y-16">
                            <Skeleton className="h-4 w-[180px]" />
                            <Skeleton className="h-4 w-[180px]" />
                          </div>
                        </div>
                      </div>
                    )}
                    {data?.data?.items.map((item) => (
                      <CartProduct item={item} key={item.id} />
                    ))}
                    {!isLoading && data?.data?.items.length === 0 && (
                      <div className="my-4">
                        <Alert className="mx-auto md:text-center">
                          <ShoppingCart className="w-4 h-4 md:hidden" />
                          <AlertTitle>Your cart is currently empty</AlertTitle>
                          <AlertDescription>
                            Please add items before proceeding.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </ul>
                </section>

                {/* Order summary */}
                {!isLoading && data?.data?.items.length !== 0 && (
                  <CartOrderSummary totalPrice={totalPrice ? totalPrice : 0} />
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
