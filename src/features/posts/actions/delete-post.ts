"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = { success: boolean };

export const deletePost = async (
  prevState: ActionState,
  postId: string,
): Promise<ActionState> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.post.delete({
    where: { id: postId, userId: session.user.id },
  });

  revalidatePath("/posts");
  redirect("/posts");
};
