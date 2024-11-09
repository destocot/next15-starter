"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreatePostModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-post",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  );

  const open = () => void setIsOpen(true);
  const close = () => void setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};
