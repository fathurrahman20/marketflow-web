"use client";

import CartProduct from "@/components/cart/cart-product";
import Layout from "@/components/layout";
import useCart from "@/hooks/useCarts";
import { Link } from "react-router";

export default function CartPage() {
  const { data } = useCart();
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
                    {data?.data?.items.map((item) => (
                      <CartProduct item={item} key={item.id} />
                    ))}
                  </ul>
                </section>

                {/* Order summary */}
                <section
                  aria-labelledby="summary-heading"
                  className="mt-10 sm:ml-32 sm:pl-6">
                  <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                    <h2 id="summary-heading" className="sr-only">
                      Order summary
                    </h2>

                    <div className="flow-root">
                      <dl className="-my-4 divide-y divide-gray-200 text-sm">
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd className="font-medium text-gray-900">
                            Rp 99.000.000
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd className="font-medium text-gray-900">
                            Rp 30.000
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-base font-medium text-gray-900">
                            Order total
                          </dt>
                          <dd className="text-base font-medium text-gray-900">
                            Rp 99.030.000
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                      Checkout
                    </button>
                  </div>

                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link
                        to="/products"
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
