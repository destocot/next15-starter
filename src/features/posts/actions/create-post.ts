"use server";

import { auth } from "@/auth";
import { CreatePostSchema, type CreatePostInput } from "../validators";
import { flatten, safeParse } from "valibot";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  errors:
    | ({
        root?: string;
      } & {
        [key in keyof CreatePostInput]?: string;
      })
    | null;
};

export const createPost = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedFormData = safeParse(
    CreatePostSchema,
    Object.fromEntries(formData.entries()),
  );

  if (!parsedFormData.success) {
    const { root, nested } = flatten<typeof CreatePostSchema>(
      parsedFormData.issues,
    );
    return {
      success: false,
      errors: {
        ...(root ? { root: root[0] } : {}),
        ...(nested?.title ? { title: nested.title[0] } : {}),
        ...(nested?.content ? { content: nested.content[0] } : {}),
      },
    };
  }

  const { title, content } = parsedFormData.output;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });

  revalidatePath("/posts");
  redirect(`/post/${newPost.id}`);
};
