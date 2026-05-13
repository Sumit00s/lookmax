import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  void req;
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("credits")
    .eq("email", session.user.email)
    .single();

  if (error || !data) {
    return Response.json({ credits: 0 });
  }

  return Response.json({ credits: data.credits ?? 0 });
}
