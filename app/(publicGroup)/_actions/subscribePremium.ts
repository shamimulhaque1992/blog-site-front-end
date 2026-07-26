"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const subscribePremium = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const res = await fetch(
    `${process.env.BACKEND_API_URL}subscription/checkout`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  if (result.success && result.data.paymentUrl) {
    redirect(result.data.paymentUrl);
  }
  return result
};
