import { CartItems } from "@/hooks/useCarts";
import { formatIdr } from "@/lib/utils";
import { queryClient } from "@/main";
import APIClient from "@/service/api-client";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function CartProduct({ item }: { item: CartItems }) {
  const apiClient = new APIClient(`/carts/${item.id}`);
  const { mutate } = useMutation({
    mutationFn: () => {
      return apiClient.delete({ withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Remove item successfully");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["carts"] }),
  });

  const handleRemoveItem = () => {
    mutate();
  };
  return (
    <>
      <li key={item.id} className="flex py-3 sm:py-10">
        <div className="shrink-0">
          <img
            alt={item.product.name}
            src={item.product.imageUrl}
            className="size-24 rounded-lg object-cover sm:size-32"
          />
        </div>

        <div className="relative ml-4 flex flex-1 flex-col justify-center gap-y-4 sm:ml-6">
          <div>
            <div className="flex justify-between sm:grid sm:grid-cols-2">
              <div className="pr-6">
                <h3 className="text-sm">
                  <Link
                    to={`/products/${item.product.slug}`}
                    className="font-medium text-gray-700 hover:text-gray-800">
                    {item.product.name}
                  </Link>
                </h3>
              </div>

              <p className="text-right text-sm font-medium text-gray-900">
                {formatIdr(item.product.price)}
              </p>
            </div>

            <p></p>

            <div className="mt-4 flex flex-col flex-auto items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
              <div className="mt-7 flex flex-1 items-end">
                <dl className="flex divide-x divide-gray-200 text-sm">
                  <div className="flex pr-4 sm:pr-6">
                    <dt className="font-medium text-gray-900">Quantity:</dt>
                    <dd className="ml-2 text-gray-700">{item.quantity}</dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900"></dt>
                    <dd className="-ml-1 text-gray-700">
                      <button
                        type="button"
                        onClick={handleRemoveItem}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3 md:mt-0">
                        <span>Remove</span>
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
            {item.product.stock > 1 ? (
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
              {item.product.stock > 1 ? "In stock" : `Ships in 3 days`}
            </span>
          </p>
        </div>
      </li>
    </>
  );
}
