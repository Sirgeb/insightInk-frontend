"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <Card className="w-full max-w-md border border-white/10 bg-[#0b0f0f] backdrop-blur-xl shadow-2xl">
      <CardContent className="p-8">
        <div className="text-xl md:text-2xl text-center font-medium mb-6 text-white">
          <p>Get started with InsightInk</p>
          <p className="text-sm">Your sleek, modern voice-to-text todo app</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-gray-300">Email Address</Label>
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-white/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-0"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              className="bg-transparent border-white/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-0"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 hover:cursor-pointer"
          >
            Sign In
          </Button>

          <p className="text-sm text-white text-center">
            Don't have an account?{" "}
            <span
              onClick={() => {
                router.push("/signup");
              }}
              className="text-emerald-400 hover:cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
