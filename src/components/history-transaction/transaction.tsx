interface TransactionProps {
  id: string;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
}

export default function Transaction({ id, status }: TransactionProps) {
  return (
    <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
      <h2
        id={`${id}-heading`}
        className="text-lg font-medium text-gray-900 md:shrink-0">
        Order #{id}
      </h2>
      <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
        <p className="text-sm font-medium text-gray-500">{status}</p>
      </div>
    </div>
  );
}
