import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { formatCurrency } from '@/lib/formatters';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const { payment_intent } = await searchParams;

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (paymentIntent.metadata.productId == null) {
    return notFound();
  }

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });

  if (product == null) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === 'succeeded';

  return (
    <div className='mx-auto w-full max-w-5xl space-y-8'>
      <h1 className='text-4xl font-bold'>{isSuccess ? 'Success!' : 'Error'}</h1>
      <div className='flex items-center gap-4'>
        <div className='relative aspect-video w-1/3 flex-shrink-0'>
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className='object-cover'
          />
        </div>
        <div>
          <div className='text-lg'>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {product.description}
          </div>
          <Button className='mt-4' size='lg' asChild>
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(product.id)}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function createDownloadVerification(productId: string) {
  const downloadVerification = await db.downloadVerification.create({
    data: {
      productId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  return downloadVerification.id;
}
