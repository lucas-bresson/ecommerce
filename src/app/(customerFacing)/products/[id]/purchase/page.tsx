import db from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();
  return (
    <div>
      <h1>Purchase</h1>
    </div>
  );
}
