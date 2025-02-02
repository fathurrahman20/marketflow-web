"use client";

import Layout from "@/components/layout";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";

const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
    leadTime: "3-4 Weeks",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
    leadTime: "3-4 Weeks",
  },
  // More products...
];
export default function CartPage() {
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
                    {products.map((product, productIdx) => (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="shrink-0">
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="size-24 rounded-lg object-cover sm:size-32"
                          />
                        </div>

                        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div>
                            <div className="flex justify-between sm:grid sm:grid-cols-2">
                              <div className="pr-6">
                                <h3 className="text-sm">
                                  <a
                                    href={product.href}
                                    className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.name}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                                {product.size ? (
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div>

                              <p className="text-right text-sm font-medium text-gray-900">
                                {product.price}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                              <div className="inline-grid w-full max-w-16 grid-cols-1">
                                <select
                                  id={`quantity-${productIdx}`}
                                  name={`quantity-${productIdx}`}
                                  aria-label={`Quantity, ${product.name}`}
                                  className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                </select>
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                              </div>

                              <button
                                type="button"
                                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3">
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            {product.inStock ? (
                              <CheckIcon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-green-500"
                              />
                            ) : (
                              <ClockIcon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-gray-300"
                              />
                            )}

                            <span>
                              {product.inStock
                                ? "In stock"
                                : `Ships in ${product.leadTime}`}
                            </span>
                          </p>
                        </div>
                      </li>
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
                          <dd className="font-medium text-gray-900">$99.00</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd className="font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-gray-600">Tax</dt>
                          <dd className="font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="text-base font-medium text-gray-900">
                            Order total
                          </dt>
                          <dd className="text-base font-medium text-gray-900">
                            $112.32
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
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
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
