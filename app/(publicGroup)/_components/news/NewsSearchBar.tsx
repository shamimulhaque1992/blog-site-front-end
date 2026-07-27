"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";

const NewsSearchBar = () => {
  const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleChange = (searchTerm: string) => {
    if (debounceReference.current) {
      clearTimeout(debounceReference.current);
    }

    debounceReference.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("searchTerm", searchTerm);
      } else {
        params.delete("searchTerm");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size=4 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search news"
        className="pl-9"
      />
    </div>
  );
};

export default NewsSearchBar;
