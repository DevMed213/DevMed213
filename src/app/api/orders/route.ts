import { parseOrder, readOrders, saveOrders } from "@/lib/orders";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Demande invalide." }, { status: 400 });
  }

  const { order, error } = await parseOrder(body);
  if (!order) return Response.json({ error }, { status: 400 });

  const orders = await readOrders();
  orders.unshift(order);
  await saveOrders(orders);

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    }).catch(() => undefined);
  }

  return Response.json({ id: order.id });
}
