import { TransactionItem as Item } from "@/hooks/useTransactions";
import { formatIdr } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface TransactionItemProps {
  item: Item;
}
export default function TransactionItem({ item }: TransactionItemProps) {
  return (
    <div key={item.id} className="py-6 sm:flex">
      <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
        <img
          alt={item.product.name}
          src={item.product.imageUrl}
          className="size-20 flex-none rounded-md object-cover sm:size-48"
        />
        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/products/${item.product.slug}`}>
              {item.product.name}
            </Link>
          </h3>
          <p className="truncate text-sm text-gray-500">
            <span>Qty</span>{" "}
            <span aria-hidden="true" className="mx-1 text-gray-400">
              &middot;
            </span>{" "}
            <span>{item.quantity}</span>
          </p>
          <p className="mt-1 font-medium text-gray-900">
            {formatIdr(item.price)}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
        <Button
          asChild
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:grow-0">
          <Link to={`/products/${item.product.slug}`}>Buy again</Link>
        </Button>
        <Button
          asChild
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:grow-0">
          <Link to="/products">Shop similar</Link>
        </Button>
      </div>
    </div>
  );
}
