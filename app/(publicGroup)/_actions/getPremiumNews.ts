"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}posts/premium`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 60,
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();
  return result;
};
