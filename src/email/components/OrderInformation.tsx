import { formatCurrency } from '@/lib/formatters';
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components';

type OrderInformationProps = {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
  downloadVerificationId: string;
};

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export function OrderInformation({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className='mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500'>
              Order ID
            </Text>
            <Text className='mr-4 mt-0'>{order.id}</Text>
          </Column>
          <Column>
            <Text className='mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500'>
              Purchased On
            </Text>
            <Text className='mr-4 mt-0'>
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className='mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500'>
              Price Paid
            </Text>
            <Text className='mr-4 mt-0'>
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className='my-4 rounded-lg border border-solid border-gray-500 p-4 md:p-6'>
        <Img
          width='100%'
          alt={product.name}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
        />
        <Row className='mt-8'>
          <Column className='align-bottom'>
            <Text className='m-0 mr-4 text-lg font-bold'>{product.name}</Text>
          </Column>
          <Column align='right'>
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className='rounded bg-black px-6 py-4 text-lg text-white'
            >
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className='mb-0 text-gray-500'>{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
