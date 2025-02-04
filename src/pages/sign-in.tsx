"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import APIClient, { ErrorResponse, FetchResponse } from "@/service/api-client";
import { AxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
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
import Spinner from "@/components/ui/spinner-loading";

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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  useTitlePage("Sign In");

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
      toast.error(error.response?.data.message);
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
                        autoComplete="password"
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <>
                      <Spinner />
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
