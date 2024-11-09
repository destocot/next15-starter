"use client";

import { TrashIcon } from "lucide-react";
import { startTransition, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { ActionState, deletePost } from "../actions/delete-post";

type DeletePostButtonProps = { postId: string };

export const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [_state, action, isPending] = useActionState<ActionState, string>(
    deletePost,
    { success: false },
  );

  // const { open } = useDeletePostModal();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Post",
    "This action cannot be undone.",
    "destructive",
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    startTransition(() => {
      action(postId);
    });
  };

  return (
    <>
      <DeleteDialog />
      <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
        Delete Post
        <TrashIcon />
      </Button>
    </>
  );
};
