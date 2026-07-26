"use server";

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}subscription/status`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      //   cache: "force-cache",
      //   next: {
      //     revalidate: 60 * 60 * 24,
      //     tags: ["subscription-status"],
      //   },
    },
  );
  const result = await res.json();
  return result;
};
