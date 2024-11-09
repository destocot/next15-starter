import { clsx, type ClassValue } from "clsx";
import type { User } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDisplayName(user: User) {
  if (user.name) {
    return user.name;
  }

  if (user.email) {
    return user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  }

  return "guest";
}
