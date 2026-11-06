import { cookies } from "next/headers";
import { adminCookie, adminToken, credentialsAccepted } from "@/lib/auth";

export async function POST(request: Request) {
  let username = "";
  let password = "";
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    username = body.username ?? "";
    password = body.password ?? "";
  } catch {
    username = "";
    password = "";
  }

  if (!credentialsAccepted(username, password)) {
    return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(adminCookie, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true });
}
