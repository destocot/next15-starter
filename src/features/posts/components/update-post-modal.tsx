"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdatePostModal } from "../hooks/use-update-post-modal";
import { UpdatePostForm } from "./update-post-form";
import { Post } from "@prisma/client";

type UpdatePostModal = { defaultValues: Post };

export const UpdatePostModal = ({ defaultValues }: UpdatePostModal) => {
  const { isOpen, setIsOpen, close } = useUpdatePostModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <UpdatePostForm onCancel={close} defaultValues={defaultValues} />
    </ResponsiveModal>
  );
};
