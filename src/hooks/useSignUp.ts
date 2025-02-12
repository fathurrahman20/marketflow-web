import APIClient, { ErrorResponse, FetchResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

const apiClient = new APIClient("/auth/register");

export default function useSignUp() {
  const navigate = useNavigate();
  return useMutation<
    FetchResponse<RegisterResponse>,
    AxiosError<ErrorResponse>,
    RegisterRequest
  >({
    mutationFn: (data: RegisterRequest) => {
      return apiClient.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast.success("Registered successfully");
      navigate("/signin");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
}
