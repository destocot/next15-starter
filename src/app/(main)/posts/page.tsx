import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma";
import Link from "next/link";
import { Pagination } from "@/features/posts/components/pagination";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { CreatePostButton } from "@/features/posts/components/create-post-button";

type PostsPageProps = { searchParams: Promise<{ pg?: string }> };

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const pg = Math.max(1, Math.floor(Number((await searchParams).pg) || 1));

  const [posts, postsCount] = await prisma.$transaction([
    prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      skip: (pg - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({ where: { userId: session.user.id } }),
  ]);

  return (
    <div className="container max-w-2xl pb-4 pt-12">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <CreatePostButton />
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You haven&apos;t created any posts yet.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id} className="block">
              <Card className="flex h-[180px] w-full flex-col overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="flex-shrink-0 p-4">
                  <CardDescription className="text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                  <CardTitle className="line-clamp-2 min-h-[48px] text-xl font-bold">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex w-full justify-center">
        <Pagination currentPage={pg} postsCount={postsCount} />
      </div>
    </div>
  );
}
