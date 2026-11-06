import { isAdmin } from "@/lib/auth";
import { readOrders, saveOrders } from "@/lib/orders";

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Non autorisé." }, { status: 401 });

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = body.id ?? "";
  } catch {
    id = "";
  }
  if (!id) return Response.json({ error: "Commande introuvable." }, { status: 400 });

  const orders = await readOrders();
  await saveOrders(orders.filter((order) => order.id !== id));
  return Response.json({ ok: true });
}
