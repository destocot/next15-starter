"use client";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPost,
  type ActionState,
} from "@/features/posts/actions/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type CreatePostFormProps = {
  onCancel?: () => void;
};

export const CreatePostForm = ({ onCancel }: CreatePostFormProps) => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createPost,
    { success: false, errors: null },
  );

  if (state.success) {
    window.location.href = "/";
  }

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-2.5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" aria-describedby="titleError" />
            {state.errors?.title && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.title}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              aria-describedby="contentError"
            />
            {state.errors?.content && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.content}
              </p>
            )}
            {state.errors?.root && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.root}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-x-4">
            {onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button className="flex-1" disabled={isPending}>
              Create Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
