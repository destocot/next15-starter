"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup, type ActionState } from "@/features/auth/actions/signup";

export const SignupForm = () => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signup,
    { success: false, errors: null },
  );

  if (state.success) {
    window.location.href = "/";
  }

  return (
    <form action={formAction} className="space-y-2.5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          aria-describedby="emailError"
        />
        {state.errors?.email && (
          <p className="mt-2 text-sm text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          aria-describedby="passwordError"
        />
        {state.errors?.password && (
          <p className="mt-2 text-sm text-destructive">
            {state.errors.password}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          aria-describedby="confirmPasswordError"
        />
        {state.errors?.confirmPassword && (
          <p className="mt-2 text-sm text-destructive">
            {state.errors.confirmPassword}
          </p>
        )}
        {state.errors?.root && (
          <p className="mt-2 text-sm text-destructive">{state.errors.root}</p>
        )}
      </div>

      <Button className="w-full" disabled={isPending}>
        Sign Up
      </Button>
    </form>
  );
};
