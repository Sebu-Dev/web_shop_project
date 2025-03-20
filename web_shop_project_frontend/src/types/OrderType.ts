// @/types/OrderType.ts
import { ProductType } from '@/types/ProductType';

export interface Order {
  id: string; // Eindeutige Bestell-ID
  date: string; // ISO-Datum (z. B. "2023-10-20T12:00:00Z")
  items: ProductType[]; // Produkte im Warenkorb
  subtotalBrutto: number; // Zwischensumme brutto (ohne Versand)
  mwstRate: number; // MwSt.-Satz (z. B. 0.19 für 19%)
  mwstAmount: number; // MwSt.-Betrag
  shippingCosts: number; // Versandkosten
  totalWithShipping: number; // Gesamtbetrag inkl. Versand
  userId?: string; // Optional: Benutzer-ID für Backend-Integration
}
