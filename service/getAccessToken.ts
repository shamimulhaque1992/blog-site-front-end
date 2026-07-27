"use server";

import { jwtUtils } from "@/utils/jwt";
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

export const validateAccessToken = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  if (!accessToken && !refreshToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getAccessToken();
    console.log("🚀 ~ proxy ~ result:", result);

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      accessToken = newAccessToken;
    }
  }
  return accessToken;
};
