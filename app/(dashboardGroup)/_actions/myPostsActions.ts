"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyPosts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const res = await fetch(`${process.env.BACKEND_API_URL}posts/my-posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    next: {
      revalidate: 0,
      tags: ["my-posts"],
    },
  });

  const result = await res.json();
  return result;
};

export type IInitialState = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string;
  isPremium: boolean;
};
export const createAPosts = async (
  initialState: IInitialState,
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}posts`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("regular-posts", {
      expire: 0,
    });
  }

  return result;
};

export const updateAPosts = async (
  postId: string,
  initialState: IInitialState,
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
    tags: (formData.get("tags") as string).split(", ") ?? [],
    isPremium: formData.get("isPremium") === "on",
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("regular-posts", {
      expire: 0,
    });
  }

  return result;
};
