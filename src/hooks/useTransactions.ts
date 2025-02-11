import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useProducts";

export interface TransactionItem {
  id: string;
  transactionId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface Transaction {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  totalAmount: 66530000;
  paymentMethod: "CASH" | "CASHLESS";
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  items: TransactionItem[];
}

const apiClient = new APIClient<Transaction[]>("/transactions");

const useTransaction = () =>
  useQuery({
    queryKey: ["transaction"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });

export default useTransaction;
