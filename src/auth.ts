import NextAuth from "next-auth";
import { safeParse } from "valibot";
import { encode as defaultEncode } from "next-auth/jwt";
import { randomUUID as uuid } from "node:crypto";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/prisma";
import { SigninSchema } from "@/features/auth/validators";
import { verifyPassword } from "./lib/argon2";

const MAX_AGE = 15 * 60; // 15 minutes
const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "database", maxAge: MAX_AGE },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    session: ({ session, user }) => {
      return {
        expires: session.expires,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      };
    },
  },
  jwt: {
    encode: async (params) => {
      if (!params.token?.credentials) {
        return defaultEncode(params);
      }

      const userId = params.token.sub;
      if (!userId) {
        throw new Error("User ID not found in JWT token");
      }

      if (typeof adapter.createSession !== "function") {
        throw new Error("createSession function not implemented in adapter");
      }

      const sessionToken = uuid();
      const expirationDate = new Date(Date.now() + MAX_AGE * 1000);

      try {
        const newSession = await adapter.createSession({
          sessionToken,
          userId,
          expires: expirationDate,
        });

        if (!newSession) {
          throw new Error("Failed to create session");
        }

        return newSession.sessionToken;
      } catch (error) {
        console.error("Error creating session:", error);
        throw new Error("Session creation failed due to internal error");
      }
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user?.id) return null;

          if (!user.password) return null;
          const passwordsMatch = await verifyPassword(password, user.password);

          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
