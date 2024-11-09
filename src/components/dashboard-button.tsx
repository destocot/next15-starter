"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const DashboardButton = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Button size="sm" variant="secondary" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <Button size="sm" asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  );
};
