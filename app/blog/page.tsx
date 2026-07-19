import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";

import { DogPhoto } from "@/components/dog-photo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and stories from the Paw Prints shelter.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <section>
        <h1 className="font-heading text-4xl font-bold tracking-tight">From the shelter</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Adoption stories, drive results and news from the Paw Prints team.
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-md hover:ring-1 hover:ring-primary/40">
              {post.photoHue !== null && (
                <DogPhoto hue={post.photoHue} className="h-44 w-full" />
              )}
              <CardHeader className={post.photoHue === null ? "pt-6" : undefined}>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserRound className="size-3.5" /> {post.author}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{post.brief}</CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
