"use client";

import { ThemeProvider } from "./theme-provider";
import type { ReadonlyChildren } from "@/types";

export const Providers = ({ children }: ReadonlyChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
