import { formatIdr } from "@/lib/utils";
import { Link } from "react-router";

export default function CartOrderSummary({
  totalPrice,
}: {
  totalPrice: number;
}) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-10 sm:ml-32 sm:pl-6">
      <div className="px-4 py-6 rounded-lg bg-gray-50 sm:p-6 lg:p-8">
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <div className="flow-root">
          <dl className="-my-4 text-sm divide-y divide-gray-200">
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">
                {formatIdr(totalPrice)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-10">
        <Link to="/checkout">
          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-medium text-white bg-[#111827] hover:bg-[#1c2844] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1c2844] focus:ring-offset-2 focus:ring-offset-gray-50">
            Checkout
          </button>
        </Link>
      </div>

      <div className="mt-6 text-sm text-center text-gray-500">
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
  );
}
