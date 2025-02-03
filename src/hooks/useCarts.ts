import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useProducts";

export interface CartItems {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}
export interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItems[];
}

const apiClient = new APIClient<Cart>("/carts");

const useCart = () =>
  useQuery({
    queryKey: ["carts"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    staleTime: 1000,
  });

export default useCart;
