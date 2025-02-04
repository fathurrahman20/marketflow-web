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
import useTitlePage from "@/hooks/useTitlePage";
import Spinner from "@/components/ui/spinner-loading";

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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  useTitlePage("Sign Up");

  let password = "";
  const formSchema = z.object({
    name: z.string().min(3).max(25),
    email: z.string().email().min(2).max(100),
    password: z
      .string()
      .min(6)
      .max(100)
      .refine((value) => {
        password = value;
        return true;
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "You must confirm your password" })
      .max(100)
      .refine((value) => value === password, "Passwords not match"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation<
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, name, password } = values;
    mutation.mutate({ name, email, password });
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
            Sign Up
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        {...field}
                        className="flex w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </FormControl>
                    <FormDescription>You're name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="******"
                        autoComplete="password"
                        {...field}
                        right={
                          showConfirmPassword ? (
                            <Eye
                              className="cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(
                                  (prevState) => !prevState
                                )
                              }
                            />
                          ) : (
                            <EyeClosed
                              className="cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(
                                  (prevState) => !prevState
                                )
                              }
                            />
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>You're confirm password</FormDescription>
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
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="mt-10 text-center text-gray-500 text-sm/6">
            Already have account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-[#2E2E2E] hover:text-[#474747]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
