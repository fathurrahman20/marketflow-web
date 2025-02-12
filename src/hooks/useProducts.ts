import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  stock: number;
  price: number;
}

interface ProductAPIParams {
  category?: string | undefined;
  brand?: string | undefined;
  page?: string | undefined;
}

const apiClient = new APIClient<Product[]>("/products");

const useProducts = ({ category, brand, page }: ProductAPIParams) =>
  useQuery({
    queryKey: ["products", category, brand, page],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          category: category || undefined,
          brand: brand || undefined,
          page: page || undefined,
        },
        // withCredentials: true,
      });
    },
  });

export default useProducts;
