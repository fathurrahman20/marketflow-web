import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useProducts";

interface Wishlists {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

const apiClient = new APIClient<Wishlists[]>("/wishlists");

const useWishlists = () =>
  useQuery({
    queryKey: ["wishlists"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });

export default useWishlists;
