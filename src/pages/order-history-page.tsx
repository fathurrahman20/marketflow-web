import Transaction from "@/components/history-transaction/transaction";
import TransactionItem from "@/components/history-transaction/transaction-item";
import Layout from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useTitlePage from "@/hooks/useTitlePage";
import useTransaction from "@/hooks/useTransactions";
import { formatIdr } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

export default function OrderHistoryPage() {
  const { data, isLoading } = useTransaction();
  const navigate = useNavigate();
  useTitlePage("History Transaction");
  // const totalPrice = data?.data?.items?.reduce(
  //   (acc, item) => acc + item.totalPrice * item.quantity,
  //   0
  // );
  // const totalPrice = data?.data.map((order) =>
  //   order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  // );

  // const total = data?.data?.map((order) =>
  //   order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  // );
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-xl">
            <h1
              id="your-orders-heading"
              className="text-3xl font-bold tracking-tight text-gray-900">
              Your Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>

          <div className="mt-12 space-y-16 sm:mt-16">
            {isLoading &&
              [1, 2].map((index) => (
                <div key={index} className="flex flex-row -my-3">
                  <Skeleton className="h-[120px] w-[130px] my-auto" />
                  <div className="flex flex-row items-center justify-between w-full px-5">
                    <div className="flex flex-col justify-center -mt-10 gap-y-4">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <div className="flex flex-col justify-center gap-y-4 -mt-11">
                      <Skeleton className="h-8 w-[160px]" />
                      <Skeleton className="h-8 w-[160px]" />
                    </div>
                  </div>
                </div>
              ))}
            {!isLoading && data?.data.length === 0 && (
              <div className="-mt-4">
                <Alert className="mx-auto md:text-center py-6">
                  <ShoppingBag className="w-4 h-4 md:hidden" />
                  <AlertTitle>No Transactions Yet</AlertTitle>
                  <AlertDescription className="mt-2">
                    Start shopping to place your first order.
                  </AlertDescription>
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => navigate("/products")}
                      className="rounded-md mt-2 bg-[#111827] hover:bg-[#192235] px-4 py-2 text-white">
                      Shop Now
                    </Button>
                  </div>
                </Alert>
              </div>
            )}
            {data?.data?.map((order) => (
              <section key={order.id} aria-labelledby={`${order.name}-heading`}>
                <Transaction id={order.id} status={order.status} />

                <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                  {order?.items?.map((item) => (
                    <TransactionItem item={item} />
                  ))}
                </div>
                <h2 className="text-end">
                  Total: {formatIdr(order.totalAmount)}
                </h2>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
