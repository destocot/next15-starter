"use server";

import { flatten, safeParse } from "valibot";

import { signIn } from "@/auth";
import { SigninSchema, type SigninInput } from "@/features/auth/validators";

export type ActionState = {
  success: boolean;
  errors:
    | ({
        root?: string;
      } & {
        [key in keyof SigninInput]?: string;
      })
    | null;
};

export const signin = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parsedFormData = safeParse(
    SigninSchema,
    Object.fromEntries(formData.entries()),
  );

  if (!parsedFormData.success) {
    const { root, nested } = flatten<typeof SigninSchema>(
      parsedFormData.issues,
    );
    return {
      success: false,
      errors: {
        ...(root ? { root: root[0] } : {}),
        ...(nested?.email ? { email: nested.email[0] } : {}),
        ...(nested?.password ? { password: nested.password[0] } : {}),
      },
    };
  }

  await signIn("credentials", {
    email: parsedFormData.output.email,
    password: parsedFormData.output.password,
    redirect: false,
  });

  return { success: true, errors: null };
};
