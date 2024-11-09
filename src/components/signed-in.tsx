"use client";

import { useSession } from "next-auth/react";

export const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  if (!session) return null;

  return <>{children}</>;
};
