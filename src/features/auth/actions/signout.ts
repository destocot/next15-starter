"use server";

import { auth, signOut } from "@/auth";

export const signout = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await signOut({ redirect: false });
};
