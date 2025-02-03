"use client";

import CartOrderSummary from "@/components/cart/cart-order-summary";
import CartProduct from "@/components/cart/cart-product";
import Layout from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import useCart from "@/hooks/useCarts";
import useTitlePage from "@/hooks/useTitlePage";

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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl pt-16">
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
                    className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {isLoading && (
                      <div className="flex flex-row py-5">
                        <Skeleton className="h-[100px] w-[110px] my-auto" />
                        <div className="w-full items-center justify-between px-5 flex flex-row">
                          <div className="flex flex-col gap-y-16 justify-center">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                          <div className="flex flex-col gap-y-16 justify-center">
                            <Skeleton className="h-4 w-[180px]" />
                            <Skeleton className="h-4 w-[180px]" />
                          </div>
                        </div>
                      </div>
                    )}
                    {data?.data?.items.map((item) => (
                      <CartProduct item={item} key={item.id} />
                    ))}
                  </ul>
                </section>

                {/* Order summary */}
                <CartOrderSummary totalPrice={totalPrice ? totalPrice : 0} />
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
