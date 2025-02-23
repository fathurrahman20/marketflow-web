import { CartItems } from "@/hooks/useCarts";
import { formatIdr } from "@/lib/utils";
import { queryClient } from "@/main";
import APIClient from "@/service/api-client";
// import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function CartProduct({ item }: { item: CartItems }) {
  const apiClient = new APIClient(`/carts/${item.id}`);
  const { mutate, isPending } = useMutation({
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
      <li key={item.id} className="flex py-6">
        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            alt={item.product.name}
            src={item.product.imageUrl}
            className="size-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to={`/products/${item.product.slug}`}>
                  {item.product.name}
                </Link>
              </h3>
              <p className="ml-4">
                {formatIdr(item?.totalPrice * item?.quantity)}
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty {item.quantity}</p>

            <div className="flex">
              <button
                type="button"
                onClick={handleRemoveItem}
                disabled={isPending}
                className="font-medium text-indigo-600 hover:text-indigo-500">
                {isPending ? (
                  <div className="flex">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="ml-2">Loading</span>
                  </div>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
