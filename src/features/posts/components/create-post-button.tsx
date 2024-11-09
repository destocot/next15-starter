"use client";

import { Button } from "@/components/ui/button";
import { useCreatePostModal } from "../hooks/use-create-post-modal";
import { CirclePlusIcon } from "lucide-react";

export const CreatePostButton = () => {
  const { open } = useCreatePostModal();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-neutral-500"
      onClick={open}
    >
      Create Post
      <CirclePlusIcon />
    </Button>
  );
};
