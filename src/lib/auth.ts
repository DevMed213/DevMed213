import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookie = "dm_admin";

function expectedUser() {
  return process.env.ADMIN_USER || "imad";
}

function expectedPassword() {
  return process.env.ADMIN_PASSWORD || "imadd";
}

function tokenFor(user: string, password: string) {
  return createHash("sha256").update(`devmed213::${user}::${password}`).digest("hex");
}

function same(left: string, right: string) {
  const a = Buffer.from(tokenFor(left, "check"));
  const b = Buffer.from(tokenFor(right, "check"));
  return timingSafeEqual(a, b);
}

export function credentialsAccepted(user: string, password: string) {
  const userOk = same(user, expectedUser());
  const passwordOk = same(password, expectedPassword());
  return userOk && passwordOk;
}

export function adminToken() {
  return tokenFor(expectedUser(), expectedPassword());
}

export async function isAdmin() {
  const jar = await cookies();
  const value = jar.get(adminCookie)?.value ?? "";
  const good = adminToken();
  if (value.length !== good.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(good));
}
