"use client";
import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@prisma/client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdatePostModal } from "../hooks/use-update-post-modal";
import { type ActionState, updatePost } from "../actions/update-post";

type UpdatePostFormProps = {
  onCancel?: () => void;
  defaultValues: Post;
};

export const UpdatePostForm = ({
  onCancel,
  defaultValues,
}: UpdatePostFormProps) => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updatePost,
    { success: false, errors: null },
  );

  const { isOpen, setIsOpen, close } = useUpdatePostModal();

  useEffect(() => {
    if (state.success) {
      close();
    }
  }, [close, state.success]);

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <Card className="h-full w-full border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Update Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-2.5">
            <input type="hidden" name="id" value={defaultValues.id} />

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                aria-describedby="titleError"
                defaultValue={defaultValues.title}
              />
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
                defaultValue={defaultValues.content}
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
              <Button type="submit" className="flex-1" disabled={isPending}>
                Update Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );
};
