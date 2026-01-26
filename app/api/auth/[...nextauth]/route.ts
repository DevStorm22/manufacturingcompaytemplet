import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../lib/db";
import { Admin } from "../../../../models/Admin";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (
            credentials?.email === "admin@example.com" &&
            credentials?.password === "admin123"
          ) {
            return {
              id: "1",
              email: "admin@example.com",
              role: "admin",
            };
          }
      
          return null;
        } catch (err) {
          console.error("AUTHORIZE ERROR:", err);
          return null;
        }
      }      
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token}) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };