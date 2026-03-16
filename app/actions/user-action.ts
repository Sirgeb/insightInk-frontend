"use server";

import api from "@/lib/axios";
import { getSessionCookie } from "@/lib/session-cookie";

type Result = { ok: boolean; message: string };
type UpdateProfileData = {
  fullname: string;
  email: string;
};

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

export const updateProfileInfoAction = async (
  data: UpdateProfileData,
): Promise<Result> => {
  const { fullname, email } = data;

  try {
    const jwtToken = await getSessionCookie();

    await api.put(
      "users/update-profile-info",
      { fullname, email },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    return { ok: true, message: "Profile updated successfully" };
  } catch (error) {
    return { ok: false, message: "Unable to update personal info" };
  }
};
