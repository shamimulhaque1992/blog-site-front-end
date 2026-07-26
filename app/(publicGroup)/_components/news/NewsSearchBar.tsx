"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const NewsSearchBar = () => {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size=4 -translate-y-1/2 text-muted-foreground" />
      <Input onChange={() => {}} placeholder="Search news" className="pl-9" />
    </div>
  );
};

export default NewsSearchBar;
