"use client";

import { Button } from "@/components/ui/button";
import { useUpdatePostModal } from "../hooks/use-update-post-modal";
import { PencilIcon } from "lucide-react";

export const UpdatePostButton = () => {
  const { open } = useUpdatePostModal();

  return (
    <Button variant="outline" onClick={open}>
      Update Post
      <PencilIcon />
    </Button>
  );
};
