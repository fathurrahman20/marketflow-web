import { useSearchParams } from "react-router";

export default function OrderStatusPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const transactionId = searchParams.get("transaction_id");
  console.log(transactionId);
  return <div>OrderStatusPage</div>;
}
