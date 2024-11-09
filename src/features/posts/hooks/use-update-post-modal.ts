"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

export const useUpdatePostModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-post",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  );

  const open = () => void setIsOpen(true);
  const close = () => {
    console.log(typeof window);
    setIsOpen(false);
  };

  return { isOpen, open, close, setIsOpen };
};
