import { Order } from '@/types/OrderType';

export const orderDummyData: Order[] = [
  {
    id: 0,
    userId: 1,
    orderNumber: 'order1',
    date: '2025-03-01T10:00:00Z',
    items: [
      {
        id: 1,
        name: 'Laptop',
        image: 'https://via.placeholder.com/150',
        price: 999.99,
        description: 'Leistungsstark',
        quantity: 1,
      },
      {
        id: 1,
        name: 'Maus',
        image: 'https://via.placeholder.com/150',
        price: 29.99,
        description: 'Ergonomisch',
        quantity: 2,
      },
    ],
    subtotalBrutto: 999.99 + 29.99 * 2,
    mwstRate: 0.19,
    mwstAmount: ((999.99 + 29.99 * 2) * 0.19) / (1 + 0.19),
    shippingCosts: 5.99,
    totalWithShipping: 999.99 + 29.99 * 2 + 5.99,
  },
  // Weitere Testdaten können entsprechend hinzugefügt werden
];
