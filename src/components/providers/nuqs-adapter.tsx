"use client";

import { NuqsAdapter as NextNuqsAdapter } from "nuqs/adapters/next/app";

export const NuqsAdapter = ({
  children,
  ...props
}: React.ComponentProps<typeof NextNuqsAdapter>) => {
  return <NextNuqsAdapter {...props}>{children}</NextNuqsAdapter>;
};
