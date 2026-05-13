import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Use the anon key here (service role key not needed for upsert with this schema)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        // Check if user already exists
        const { data: existing } = await supabase
          .from("users")
          .select("email, credits")
          .eq("email", user.email)
          .single();

        if (existing) {
          // Existing user — just update name/avatar
          await supabase
            .from("users")
            .update({
              name: user.name ?? null,
              avatar_url: user.image ?? null,
              updated_at: new Date().toISOString(),
            })
            .eq("email", user.email);
        } else {
          // New user — grant 5 welcome credits
          await supabase.from("users").insert({
            email: user.email,
            name: user.name ?? null,
            avatar_url: user.image ?? null,
            credits: 5,
            updated_at: new Date().toISOString(),
          });
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/", // stay on home, we use a modal
  },
});
