import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-sm backdrop-blur sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Search className="h-8 w-8" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          404 Error
        </p>
        <h1 className="mt-3 text-4xl font-inter font-semibold tracking-tight sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. You can return home or browse our latest articles to
          continue exploring.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse articles
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
