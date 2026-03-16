"use server";

import api from "@/lib/axios";
import { getSessionCookie } from "@/lib/session-cookie";

type Result = { ok: boolean; message: string };

export const updateProfilePicture = async (
  formData: FormData,
): Promise<Result> => {
  try {
    const jwtToken = await getSessionCookie();

    await api.post("/users/upload-profile-picture", formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return {
      ok: true,
      message: "Profile picture updated successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Unable to update profile picture",
    };
  }
};
