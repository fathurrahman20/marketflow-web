import { queryClient } from "@/main";
import APIClient, { ErrorResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface CheckoutRequest {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

const apiClient = new APIClient(`/transactions`);

export default function useCreateTransaction() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CheckoutRequest) => {
      return apiClient.post(data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success(
        "🎉 Your transaction is complete! Check your history for details."
      );
      navigate("/history");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data.message ||
        "Oops! Something went wrong. Please try again.";
      toast.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
