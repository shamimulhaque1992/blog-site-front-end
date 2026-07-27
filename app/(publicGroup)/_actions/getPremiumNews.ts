"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const cookieStore = await cookies();
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  console.log("🚀 ~ getPremiumNews ~`:", `${params.toString()}`)
  const res = await fetch(
    `${process.env.BACKEND_API_URL}posts/premium?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 60,
        tags: ["premium-posts"],
      },
    },
  );

  const result = await res.json();
  return result;
};
