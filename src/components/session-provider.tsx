"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const SessionProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextAuthSessionProvider>) => {
  return (
    <NextAuthSessionProvider {...props}>{children}</NextAuthSessionProvider>
  );
};
