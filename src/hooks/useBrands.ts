import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useProducts";

interface Brand {
  id: number;
  name: string;
  products: Product[];
}

const apiClient = new APIClient<Brand[]>("/brands");

const useBrands = () =>
  useQuery({
    queryKey: ["brands"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

export default useBrands;
