"use client";

import { Button } from "@/components/ui/button";
import { signout } from "@/features/auth/actions/signout";

export const SignoutButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await signout();
        window.location.href = "/login";
      }}
    >
      Sign Out
    </Button>
  );
};
