import APIClient, { ErrorResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface CartRequest {
  productId: string;
  quantity: number;
}

const apiClient = new APIClient("/carts");

export default function useAddToCart() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CartRequest) => {
      return apiClient.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
      setTimeout(() => navigate("/cart"), 2000);
    },
    onSuccess: () => {
      toast.success("Product successfully added to cart");
      setTimeout(() => {
        navigate("/cart");
      }, 500);
    },
  });
}
