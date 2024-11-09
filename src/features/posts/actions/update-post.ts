"use server";

import { auth } from "@/auth";
import { UpdatePostSchema, type UpdatePostInput } from "../validators";
import { flatten, safeParse } from "valibot";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  errors:
    | ({
        root?: string;
      } & {
        [key in keyof UpdatePostInput]?: string;
      })
    | null;
};

export const updatePost = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const parsedFormData = safeParse(
    UpdatePostSchema,
    Object.fromEntries(formData.entries()),
  );

  if (!parsedFormData.success) {
    const { root, nested } = flatten<typeof UpdatePostSchema>(
      parsedFormData.issues,
    );
    return {
      success: false,
      errors: {
        ...(root ? { root: root[0] } : {}),
        ...(nested?.id ? { root: nested.id[0] } : {}),
        ...(nested?.title ? { title: nested.title[0] } : {}),
        ...(nested?.content ? { content: nested.content[0] } : {}),
      },
    };
  }

  const { title, content, id } = parsedFormData.output;

  const updatedPost = await prisma.post.update({
    where: { id, userId },
    data: {
      ...(title ? { title } : {}),
      ...(content ? { content } : {}),
      userId,
    },
  });

  revalidatePath(`/post/${updatedPost.id}`);
  return { success: true, errors: null };
};
