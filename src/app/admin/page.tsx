import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLogin, AdminPanel } from "@/components/admin-client";
import { Container, Eyebrow } from "@/components/ui";
import { isAdmin } from "@/lib/auth";
import { readOrders } from "@/lib/orders";
import { readProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Interne</Eyebrow>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Administration</h1>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-white/50">Chargement…</p>}>
          <AdminGate />
        </Suspense>
      </div>
    </Container>
  );
}

async function AdminGate() {
  if (!(await isAdmin())) {
    return (
      <div>
        <p className="mb-6 max-w-md text-sm text-white/55">
          Commandes reçues et catalogue de logiciels.
        </p>
        <AdminLogin />
      </div>
    );
  }

  const [orders, products] = await Promise.all([readOrders(), readProducts()]);
  return <AdminPanel orders={orders} products={products} />;
}
