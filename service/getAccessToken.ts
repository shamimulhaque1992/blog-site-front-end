"use server";

import { cookies } from "next/headers";

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      message: "No refresh token found",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  return result;
};
