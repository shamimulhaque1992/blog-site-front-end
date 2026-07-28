import { Suspense } from "react";
import { NewsSkeleton } from "../_components/news/NewsSkeleton";
import { PublicNewsList } from "../_components/news/PublicNewsList";
import NewsSearchBar from "../_components/news/NewsSearchBar";
import NewsFilterComponent from "../_components/news/NewsFilterComponent";

const NewsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">News</h1>
          <p className="text-sm text-muted-foreground">
            Browse the latest published stories.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto lg:min-w-105">
          <div className="w-auto">
            <NewsFilterComponent />
          </div>
          <div className="flex-1 sm:flex-none">
            <NewsSearchBar />
          </div>
        </div>
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        <PublicNewsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default NewsPage;
