"use client";

import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useTitlePage from "@/hooks/useTitlePage";
import Spinner from "@/components/ui/spinner-loading";
import {
  ConfirmPasswordFormField,
  CustomFormField,
  PasswordFormField,
} from "@/components/common/common-form";
import signupSchema from "@/schema/signup-schema";
import useSignUp from "@/hooks/useSignUp";

export default function SignUp() {
  useTitlePage("Sign Up");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUp();
  function onSubmit(values: z.infer<typeof signupSchema>) {
    const { email, name, password } = values;
    mutate({ name, email, password });
  }

  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <h1 className="font-extrabold text-center text-2xl">Marketflow</h1>
          </Link>
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
              {/* Name */}
              <CustomFormField name="name" control={form.control} />
              {/* Email */}
              <CustomFormField name="email" control={form.control} />
              {/* Password */}
              <PasswordFormField control={form.control} />
              {/* Confirm Password */}
              <ConfirmPasswordFormField control={form.control} />
              <div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
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
