import { cookies } from "next/headers";
import { adminCookie, adminToken, passwordAccepted } from "@/lib/auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    password = "";
  }

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Mot de passe admin non configuré." }, { status: 500 });
  }
  if (!passwordAccepted(password)) {
    return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
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
