"use client";

import { startTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ActionResponse, signupAction } from "@/app/actions/auth-action";
import { useActionState } from "react";

type FormValues = {
  fullname: string;
  email: string;
  password: string;
};

const initialState: ActionResponse = {
  ok: false,
  message: "",
};

export default function SignupForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signupAction(formData);

      if (result.ok) {
        window.location.href = "/";
      }

      return result;
    } catch (err) {
      return {
        ok: false,
        message: (err as Error).message,
        errors: undefined,
      };
    }
  }, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Card className="w-full max-w-md border border-white/10 bg-[#0b0f0f] backdrop-blur-xl shadow-2xl">
      <CardContent className="p-8">
        <div className="text-xl md:text-2xl text-center font-medium mb-6 text-white">
          <p>Sign up to get started!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              className="bg-transparent border-white/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-0"
              {...register("fullname", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.fullname && (
              <p className="text-red-400 text-sm">{errors.fullname.message}</p>
            )}
          </div>

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

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 hover:cursor-pointer"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>

          <p className="text-sm text-white text-center">
            Already have an account?{" "}
            <span
              onClick={() => {
                router.push("/");
              }}
              className="text-emerald-400 hover:cursor-pointer"
            >
              Sign In
            </span>
          </p>

          {state?.message && !state.ok && (
            <p className="text-red-400 text-sm text-center">{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
