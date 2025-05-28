import { queryClient } from "@/main";
import APIClient, { ErrorResponse, FetchResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
import useSnap from "./useSnap";
// import {} from "@/hooks/useSnap"

interface CheckoutRequest {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

interface TransactionCreateResponse {
  id: string;
  userId: string;
  address: string;
  city: string;
  name: string;
  phone: string;
  postalCode: string;
  province: string;
  totalAmount: number;
  snap_token: string;
  snap_redirect_url: string;
}

const apiClient = new APIClient(`/transactions`);

export default function useCreateTransaction() {
  // const navigate = useNavigate();
  const { snapEmbed } = useSnap();
  return useMutation({
    mutationFn: (data: CheckoutRequest) => {
      return apiClient.post(data, { withCredentials: true });
    },
    onSuccess: (data: FetchResponse<TransactionCreateResponse>) => {
      // toast.success(
      //   "🎉 Your transaction is complete! Check your history for details."
      // );
      // navigate("/history");
      console.log(data);
      snapEmbed(
        data.data.snap_token
        // "snap-container"
        // {
        //   onSuccess: function (result) {
        //     console.log('success', result);
        //     navigate("/history")
        //     setSnapShow(false);
        // },
        // onPending: function(result){
        //     console.log('pending', result);
        //     navigate("/history")
        //     setSnapShow(false)
        // },
        // onClose: function () {
        //     navigate(`/order-status?transaction_id=${response.data.id}`)
        //     setSnapShow(false)
        // }
        // }
      );
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data.message ||
        "Oops! Something went wrong. Please try again.";
      toast.error(message);
      console.log("ErORR: ", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
