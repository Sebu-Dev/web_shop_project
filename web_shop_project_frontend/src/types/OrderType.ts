export interface OrderItem {
  id: number; // OrderItem-ID
  productId: number; // Entspricht Backend productId
  quantity: number; // Menge, nicht optional, da im Backend erforderlich
  price: number; // Preis pro Einheit aus OrderItem
  name: string | null; // Aus ProductDetailsDTO, kann null sein
  description: string | null; // Aus ProductDetailsDTO, kann null sein
  image: string | null; // Aus ProductDetailsDTO, kann null sein
}

export interface Order {
  id: number | null;
  orderNumber: string; // Eindeutige Bestell-ID
  date: string; // ISO-Datum (z. B. "2025-03-20T15:22:31.664Z")
  items: OrderItem[]; // Angepasst an Backend-Struktur
  subtotalBrutto: number; // Zwischensumme brutto (ohne Versand)
  mwstRate: number; // MwSt.-Satz (z. B. 0.19 für 19%)
  mwstAmount: number; // MwSt.-Betrag
  shippingCosts: number; // Versandkosten
  totalWithShipping: number; // Gesamtbetrag inkl. Versand
  userId: number; // Benutzer-ID
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
