"use server";

import { cookies } from "next/headers";

export const getRegularNews = async ({
  query,
}: {
  query: { [key: string]: string | string[] | unknown };
}) => {
  const cookieStore = await cookies();
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}posts?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["regular-posts"],
      },
    },
  );
  const result = await res.json();
  return result;
};
