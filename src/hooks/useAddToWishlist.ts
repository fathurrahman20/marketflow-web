import { queryClient } from "@/main";
import APIClient, { ErrorResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface WishlistRequest {
  productId: string;
}

const apiClient = new APIClient(`/wishlists`);

export default function useAddToWishlist() {
  return useMutation({
    mutationFn: (data: WishlistRequest) => {
      return apiClient.post(data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Done! You can find it in your wishlist.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.message === "Unauthorized") {
        toast.error("Sign in to save this product to your wishlist.");
        return;
      }
      toast.error(error.response?.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
