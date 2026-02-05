import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  AiFillAmazonSquare,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { authApi } from "../api";
import { userExists } from "../redux/slice/auth";
import { useMutation } from "@tanstack/react-query";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize form with zod resolver
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const {mutate,isPending} = useMutation({
    mutationFn: (values) => authApi.login(values),
    onSuccess: (data) => {
      dispatch(userExists(data.user));
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      );
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-white to-indigo-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <AiFillAmazonSquare className="text-4xl text-violet-600" />
            <span className="text-2xl font-bold text-gray-900">
              Shop<span className="text-violet-600">Cart</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your account to continue
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 py-5 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-violet-600 hover:text-violet-700 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 py-5 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 font-medium transition-all duration-300 hover:shadow-lg"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-600 font-medium hover:text-violet-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
