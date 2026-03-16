"use server";

import setCookieParser from "set-cookie-parser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/axios";
import { getSessionCookie } from "@/lib/session-cookie";

export type ActionResponse = {
  ok: boolean;
  message: string;
  user?: any;
};

export const getLoggedInUserAction = async () => {
  try {
    const jwtToken = await getSessionCookie();

    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return {
      ok: true,
      user: res.data.user,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      ok: false,
      message: "Unable to get user data",
    };
  }
};

export const signinAction = async (
  formData: FormData,
): Promise<ActionResponse> => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await api.post("/auth/signin", { email, password });
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers["set-cookie"]!);

    cookieData.forEach((cookie: any) =>
      //@ts-ignore
      cookieStore.set(cookie.name, cookie.value, { ...cookie }),
    );

    return {
      ok: true,
      user: res.data.user,
      message: "User logged in successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Incorrect email or password",
    };
  }
};

export const signupAction = async (formData: FormData) => {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await api.post("/auth/signup", { fullname, email, password });
    console.log("Response Headers: ", res.data);
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers["set-cookie"]!);

    cookieData.forEach((cookie: any) =>
      //@ts-ignore
      cookieStore.set(cookie.name, cookie.value, { ...cookie }),
    );

    return {
      ok: true,
      message: "Account created successfully",
    };
  } catch (error: any) {
    return {
      ok: false,
      message: "An error occurred during signup",
    };
  }
};

export async function logoutAction(): Promise<void> {
  try {
    (await cookies()).delete("session");
  } catch (error) {
    throw new Error("An error occurred during sign out");
  } finally {
    redirect("/");
  }
}
