import { useAuth } from "@/context/auth-context";
import APIClient, { ErrorResponse, FetchResponse } from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  exp: number;
  tokenOrigin: string;
}

const apiClient = new APIClient("/auth/login");

export default function useSignIn() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  return useMutation<
    FetchResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginRequest
  >({
    mutationFn: (data: LoginRequest) => {
      return apiClient.post(data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      setUser(data.data);
      toast.success("Login success");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
}
