import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useProducts";

interface Category {
  id: number;
  name: string;
  products: Product[];
}

const apiClient = new APIClient<Category[]>("/categories");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

export default useCategories;
