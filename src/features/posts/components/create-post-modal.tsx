"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreatePostForm } from "./create-post-form";
import { useCreatePostModal } from "../hooks/use-create-post-modal";

export const CreatePostModal = () => {
  const { isOpen, setIsOpen, close } = useCreatePostModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreatePostForm onCancel={close} />
    </ResponsiveModal>
  );
};
