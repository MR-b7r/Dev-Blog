"use client";

import { authFormSchema, handleError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { Loader2 } from "lucide-react";
import { userSignIn, userSignUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  signEnd,
  signFailure,
  signStart,
  signSuccess,
} from "@/lib/features/user/userSlice";

import OAuth from "./OAuth";

const AuthForm = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch();
  const { loading, error: errorMessage } = useAppSelector(
    (state) => state.user
  );
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      dispatch(signStart());
      // Sign up
      if (type === "sign-up") {
        const userData = {
          username: data.username!,
          email: data.email,
          password: data.password,
        };
        await userSignUp(userData);
        const response = await userSignIn({
          email: data.email,
          password: data.password,
        });
        dispatch(signSuccess(response));
        if (response) router.push("/");
      }
      // Sign In
      if (type === "sign-in") {
        const response = await userSignIn({
          email: data.email,
          password: data.password,
        });
        dispatch(signSuccess(response));
        if (response) router.push("/");
      }
    } catch (error) {
      dispatch(signFailure(handleError(error)));
    } finally {
      dispatch(signEnd());
    }
  };
  return (
    <div className="min-h-screen mt-20 w-full">
      <div className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center md:gap-10 gap-7">
        {/* left */}
        <div className="md:flex-1">
          <Link
            href="/"
            className="font-bold dark:text-white sm:text-4xl text-2xl text-gray-700"
          >
            <span className="px-2 py-1 logo-gradient rounded-lg text-white">
              Dev&apos;s
            </span>
            Blog
          </Link>
        </div>

        {/* right */}
        <div className="flex-1 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {type === "sign-up" && (
                <CustomForm
                  control={form.control}
                  name="username"
                  label="username"
                  placeholder=""
                  errorMessage="enter your username"
                />
              )}
              <CustomForm
                control={form.control}
                name="email"
                label="email"
                placeholder="b7r@dev.net"
                errorMessage="enter your email"
              />
              <CustomForm
                control={form.control}
                name="password"
                label="password"
                placeholder=""
                errorMessage="password is not valid"
              />
              <div className="flex flex-col gap-4 ">
                <Button
                  disabled={loading}
                  type="submit"
                  className="text-16 rounded-lg  logo-gradient font-semibold text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <OAuth />
              </div>
            </form>
          </Form>
          <div className="flex gap-2 text-sm mt-5">
            {type === "sign-in" ? (
              <>
                <span>Dont Have an account?</span>
                <Link href="/sign-up" className="text-blue-500">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span>Already Have an account?</span>
                <Link href="/sign-in" className="text-blue-500">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
