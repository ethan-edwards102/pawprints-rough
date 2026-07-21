import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";

import { DogPhoto, placeholderHue } from "@/components/dog-photo";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? post.title : "Post not found", description: post?.brief };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All posts
      </Link>

      <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight">{post.title}</h1>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" /> {post.date}
        </span>
        <span className="flex items-center gap-1.5">
          <UserRound className="size-3.5" /> {post.author}
        </span>
      </p>

      <DogPhoto
        hue={post.photoHue ?? placeholderHue(post.slug)}
        className="mt-6 h-64 w-full rounded-2xl"
        iconClassName="size-24"
      />

      <div className="mt-8 space-y-5 text-[0.95rem] leading-7 text-foreground/90">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
