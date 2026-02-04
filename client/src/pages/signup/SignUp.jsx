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
  AiOutlineUser,
} from "react-icons/ai";
import { useRegister } from "../../hooks/api";
import { userExists } from "../../redux/slice/auth";

// Zod validation schema
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register: registerUser, loading } = useRegister();

  // Initialize form with zod resolver
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    const { confirmPassword, ...userData } = values;

    const result = await registerUser(userData, {
      onSuccess: (data) => {
        if (data.success) {
          dispatch(userExists(data.user));
          toast.success("Account created successfully!");
          navigate("/");
        }
      },
      onError: (error) => {
        toast.error(error || "Registration failed. Please try again.");
      },
    });
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

          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Join us and start shopping today
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 py-5 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

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
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Create a password"
                          className="pl-10 py-5 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 py-5 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-violet-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-violet-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 font-medium transition-all duration-300 hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
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

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-600 font-medium hover:text-violet-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
