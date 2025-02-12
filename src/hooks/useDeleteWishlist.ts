import { queryClient } from "@/main";
import APIClient, { ErrorResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function useDeleteWishlist(id: string | undefined) {
  const apiClient = new APIClient(`/wishlists/${id}`);
  return useMutation({
    mutationFn: () => {
      return apiClient.delete({ withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Successfully deleted from your wishlist!");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
