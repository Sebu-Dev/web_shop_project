// @/utils/orderCalculations.ts
import { ProductType } from '@/types/ProductType';

// Schnittstelle für die Rückgabewerte der Berechnungen
export interface OrderCalculations {
  subtotalBrutto: number; // Bruttosumme ohne Versandkosten
  subtotalNetto: number; // Nettosumme ohne Versandkosten
  mwstAmount: number; // Mehrwertsteuerbetrag
  totalWithShipping: number; // Gesamtsumme inklusive Versandkosten
}

// Zentrale Berechnungsfunktion
export const calculateOrder = (
  items: ProductType[], // Array mit Produkten
  mwstRate: number = 0.19, // Standard-Mehrwertsteuersatz (19 %)
  shippingCosts: number = 5.99 // Standard-Versandkosten
): OrderCalculations => {
  // Bruttosumme berechnen
  const subtotalBrutto = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  // Nettosumme und Mehrwertsteuer berechnen
  const subtotalNetto = subtotalBrutto / (1 + mwstRate);
  const mwstAmount = subtotalBrutto - subtotalNetto;

  // Gesamtsumme inklusive Versandkosten
  const totalWithShipping = subtotalBrutto + shippingCosts;

  return { subtotalBrutto, subtotalNetto, mwstAmount, totalWithShipping };
};
