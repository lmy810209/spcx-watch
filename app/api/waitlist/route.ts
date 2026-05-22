import { NextResponse } from "next/server";
import { createServerClient, PG_UNIQUE_VIOLATION } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let email: string;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from("waitlist")
      .insert({ email });

    if (error) {
      if (error.code === PG_UNIQUE_VIOLATION) {
        return NextResponse.json(
          { error: "This email is already registered.", code: "DUPLICATE" },
          { status: 409 }
        );
      }
      console.error("[waitlist] Supabase error:", error);
      return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "You're on the IPO alert list." }, { status: 201 });
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
