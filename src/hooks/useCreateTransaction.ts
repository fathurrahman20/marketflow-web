import { queryClient } from "@/main";
import APIClient from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  return useMutation({
    mutationFn: (data: CheckoutRequest) => {
      return apiClient.post(data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("create transaction successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
