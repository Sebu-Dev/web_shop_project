import { Order } from '@/types/OrderType';

export const orderDummyData: Order[] = [
  {
    id: 1,
    orderNumber: 'order_123',
    date: '2025-03-20T15:22:31.664Z',
    items: [
      {
        id: 1,
        productId: 1,
        quantity: 1,
        price: 199.99,
        name: 'Headphones',
        description: 'Noise-cancelling Headphones',
        image: 'headphones.jpg',
      },
    ],
    subtotalBrutto: 199.99,
    mwstRate: 0.19,
    mwstAmount: 31.93,
    shippingCosts: 5.99,
    totalWithShipping: 205.98,
    userId: 123,
  },
];
