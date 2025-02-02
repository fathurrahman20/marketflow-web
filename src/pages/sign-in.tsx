"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "@/service/api-client";
import { AxiosError } from "axios";
import { AlertCircle, Eye, EyeClosed } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import useTitlePage from "@/hooks/useTitlePage";

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
interface ErrorResponse {
  errors: string;
}

const apiClient = new APIClient("/auth/login");

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  useTitlePage("Sign In");
  const notify = (message: string | undefined) => toast.error(message);

  const formSchema = z.object({
    email: z.string().email().min(2).max(100),
    password: z.string().min(6).max(100),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation<
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
      notify(error.response?.data.errors);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
            Sign in to your account
          </h2>
        </div>
        {mutation.error && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {mutation.error.response?.data.errors}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              method="POST"
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" /> */}
                      <Input
                        id="email"
                        required
                        autoComplete="email"
                        placeholder="yourname@mail.com"
                        {...field}
                        className="flex w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </FormControl>
                    <FormDescription>You're email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="******"
                        {...field}
                        right={
                          showPassword ? (
                            <Eye
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prevState) => !prevState)
                              }
                            />
                          ) : (
                            <EyeClosed
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prevState) => !prevState)
                              }
                            />
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>You're password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="w-full">
                  {mutation.isPending ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="ml-2">Loading</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="mt-10 text-center text-gray-500 text-sm/6">
            Not have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#2E2E2E] hover:text-[#474747]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
