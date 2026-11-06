import { cookies } from "next/headers";
import { adminCookie } from "@/lib/auth";

export async function POST() {
  const jar = await cookies();
  jar.delete(adminCookie);
  return Response.json({ ok: true });
}
