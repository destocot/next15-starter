import * as v from "valibot";

const EmailSchema = v.pipe(
  v.string("Your email must be a string."),
  v.nonEmpty("Please enter your email."),
  v.email("Your email address is badly formatted."),
  v.transform((input) => input.trim().toLowerCase()),
);

const PasswordSchema = v.pipe(
  v.string("Your password must be a string."),
  v.nonEmpty("Please enter your password."),
);

export const SigninSchema = v.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignupSchema = v.pipe(
  v.object({
    email: EmailSchema,
    password: v.pipe(
      PasswordSchema,
      v.minLength(6, "Your password must have 6 characters or more."),
    ),
    confirmPassword: PasswordSchema,
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => {
        return input.password === input.confirmPassword;
      },
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type SigninInput = v.InferInput<typeof SigninSchema>;
export type SigninOutput = v.InferOutput<typeof SigninSchema>;

export type SignupInput = v.InferInput<typeof SignupSchema>;
export type SignupOutput = v.InferOutput<typeof SignupSchema>;
