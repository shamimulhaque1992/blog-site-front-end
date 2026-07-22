"use server";

import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not loggedIn",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}users/me`, {
    headers: {
      // Authorization:`Bearer ${accessToken}`
      // Authorization:`Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24, tags: ["my-profile"] },
  });

  const result = await res.json();
  console.log("🚀 ~ getMyProfiel ~ result:", result);
  return result;
};
