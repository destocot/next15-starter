import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeletePostButton } from "@/features/posts/components/delete-post-button";
import { UpdatePostButton } from "@/features/posts/components/update-post-button";
import { UpdatePostModal } from "@/features/posts/components/update-post-modal";

type PostIdPageProps = { params: Promise<{ postId?: string }> };

export default async function PostIdPage({ params }: PostIdPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const post = await prisma.post.findUnique({
    where: {
      id: (await params).postId,
      userId: session.user.id,
    },
  });

  if (!post) notFound();

  return (
    <>
      <UpdatePostModal defaultValues={post} />
      <div className="container max-w-2xl pb-4 pt-12">
        <Link
          href="/posts"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Back to Posts
        </Link>

        <Card className="mt-4 w-full overflow-hidden">
          <CardHeader className="space-y-1 p-6">
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            <CardDescription className="flex space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="mr-1 size-4" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <ClockIcon className="mr-1 size-4" />
                {new Date(post.createdAt).toLocaleTimeString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-end space-x-4">
          <UpdatePostButton />
          <DeletePostButton postId={post.id} />
        </div>
      </div>
    </>
  );
}
