export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name: string | null;
  description: string | null;
  image: string | null;
}

export interface Order {
  id: number | null;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotalBrutto: number;
  mwstRate: number;
  mwstAmount: number;
  shippingCosts: number;
  totalWithShipping: number;
  userId: number;
}
// Interface für die Items, die an das Backend gesendet werden
export interface OrderItemRequest {
  productId: number; // Entspricht Backend OrderItem.productId
  quantity: number; // Entspricht Backend OrderItem.quantity
  price: number; // Entspricht Backend OrderItem.price
}

// Interface für die Order, die an das Backend gesendet wird
export interface OrderRequest {
  userId: number;
  orderNumber: string;
  date: string;
  items: OrderItemRequest[];
  subtotalBrutto: number;
  mwstRate: number;
  mwstAmount: number;
  shippingCosts: number;
  totalWithShipping: number;
}
