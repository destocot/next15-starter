"use server";

import { flatten, safeParse } from "valibot";

import { SignupSchema, type SignupInput } from "@/features/auth/validators";
import { prisma } from "@/prisma";
import { hashPassword } from "@/lib/argon2";
import { signin } from "./signin";

export type ActionState = {
  success: boolean;
  errors:
    | ({
        root?: string;
      } & {
        [key in keyof SignupInput]?: string;
      })
    | null;
};

export const signup = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parsedFormData = safeParse(
    SignupSchema,
    Object.fromEntries(formData.entries()),
  );

  if (!parsedFormData.success) {
    const { root, nested } = flatten<typeof SignupSchema>(
      parsedFormData.issues,
    );
    return {
      success: false,
      errors: {
        ...(root ? { root: root[0] } : {}),
        ...(nested?.email ? { email: nested.email[0] } : {}),
        ...(nested?.password ? { password: nested.password[0] } : {}),
        ...(nested?.confirmPassword
          ? { confirmPassword: nested.confirmPassword[0] }
          : {}),
      },
    };
  }

  const { email, password } = parsedFormData.output;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists?.id) {
    return {
      success: false,
      errors: {
        root: "User with this email already exists.",
      },
    };
  }

  const hashedPassword = await hashPassword(password);

  const name = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");

  await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const credentials = new FormData();
  credentials.append("email", email);
  credentials.append("password", password);

  return await signin({ success: false, errors: null }, credentials);
};
