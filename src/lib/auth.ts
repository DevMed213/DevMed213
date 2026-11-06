import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookie = "dm_admin";

function tokenFor(password: string) {
  return createHash("sha256").update(`devmed213::${password}`).digest("hex");
}

export function passwordAccepted(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  const a = Buffer.from(tokenFor(input));
  const b = Buffer.from(tokenFor(expected));
  return timingSafeEqual(a, b);
}

export function adminToken() {
  return tokenFor(process.env.ADMIN_PASSWORD ?? "");
}

export async function isAdmin() {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(adminCookie)?.value ?? "";
  const good = tokenFor(expected);
  if (value.length !== good.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(good));
}
