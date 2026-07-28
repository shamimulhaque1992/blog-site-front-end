"use client";

import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortOptions = [
  { value: "DESC", label: "Most recent" },
  { value: "ASC", label: "Oldest first" },
  { value: "popular", label: "Most popular" },
];

const authors = [
  { id: "1", name: "Amina Rahman" },
  { id: "2", name: "David Chen" },
  { id: "3", name: "Nadia Hassan" },
];

const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"];
const suggestedTags = ["AI", "Design", "React", "Startup", "Productivity"];

const NewsFilterComponent = () => {
  const [sortBy, setSortBy] = useState("DESC");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<string>("");
  const [tags, setTags] = useState("");
  console.log("🚀 ~ NewsFilterComponent ~ tags:", tags);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "PUBLISHED",
  ]);

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors(authorId);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
  };

  const clearFilters = () => {
    setSortBy("recent");
    setIsFeatured(false);
    setSelectedAuthors("");
    setTags("");
    setSelectedStatuses(["PUBLISHED"]);
  };

  const activeFilterCount =
    (sortBy !== "recent" ? 1 : 0) +
    (isFeatured ? 1 : 0) +
    (selectedAuthors.length > 0 ? 1 : 0) +
    (tags.length ? 1 : 0) +
    (selectedStatuses.length > 0 ? 1 : 0);

  const handleApply = () => {
    const searchParams = new URLSearchParams();

    searchParams.set("sortBy", sortBy);
    if (isFeatured) searchParams.set("isFeatured", "true");
    if (selectedAuthors) searchParams.set("authorId", selectedAuthors);
    if (tags) searchParams.set("tags", tags.split(", "));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" className="h-10 w-10 p-2">
          <Filter className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-130" align="end">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="sort-by" className="text-sm font-medium">
              Sort by
            </Label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/70 p-3">
            <Checkbox
              id="featured"
              checked={isFeatured}
              onCheckedChange={(checked) => setIsFeatured(checked === true)}
            />
            <Label htmlFor="featured" className="cursor-pointer text-sm">
              Show only featured posts
            </Label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Authors</Label>
              <span className="text-xs text-muted-foreground">
                {selectedAuthors.length} selected
              </span>
            </div>
            <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-3">
              {authors.map((author) => (
                <label
                  key={author.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={selectedAuthors.includes(author.id)}
                    onCheckedChange={() => toggleAuthor(author.id)}
                  />
                  <span>{author.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <textarea
              id="tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Enter tags separated by commas"
              className="min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            />
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setTags((prev: string) =>
                      prev.length > 0 && prev !== "" ? `${prev}, ${tag}` : tag,
                    )
                  }
                  className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-muted"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-3">
              {statuses.map((status) => (
                <label key={status} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {activeFilterCount} active
              </span>
              <span>filters</span>
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" onClick={clearFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="button">Apply</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NewsFilterComponent;
