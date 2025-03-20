import React, { useState, useCallback, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import useCartStore from '@/store/useShoppingCartStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { generateInvoicePDF } from '@/utils/generateInvoicePDF';
import { ProductType } from '@/types/ProductType';
import { Order } from '@/types/OrderType';
import { calculateOrder } from '@/utils/OrderCalculator';
import { useUserSession } from '@/store/useUserSessionStore';

const CheckoutPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart } = useCartStore();
  const { user } = useUserSession();
  const navigate = useNavigate();

  // Memoized Berechnungen mit calculateOrder
  const calculations = useMemo(() => calculateOrder(cart), [cart]);

  // Checkout handler
  const handleCheckout = useCallback(async () => {
    if (user === null) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      const orderDate = new Date().toISOString();
      const order: Order = {
        userId: user.id,
        id: `order_${Date.now()}`, // Temporäre ID
        date: orderDate,
        items: cart.map((item) => ({ ...item, quantity: item.quantity || 1 })),
        subtotalBrutto: calculations.subtotalBrutto,
        mwstRate: 0.19, // Standardwert
        mwstAmount: calculations.mwstAmount,
        shippingCosts: 5.99, // Standardwert
        totalWithShipping: calculations.totalWithShipping,
      };

      const generatedPdfUrl = await generateInvoicePDF(order);
      setPdfUrl(generatedPdfUrl);
      clearCart();
      navigate('/checkout-success', {
        state: { pdfUrl: generatedPdfUrl, order },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error('Checkout Fehler:', err);
    } finally {
      setLoading(false);
    }
  }, [cart, calculations, clearCart, navigate]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Checkout</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {cart.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            Keine Artikel im Warenkorb
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {cart.map((item: ProductType) => (
              <Card
                key={item.id}
                className="flex flex-col p-4 md:flex-row md:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="mb-4 h-20 w-20 rounded-md object-cover md:mr-4 md:mb-0"
                  loading="lazy"
                />
                <div className="flex-1">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg">
                      {item.name}
                      {item.onSale && (
                        <span className="ml-2 text-sm text-red-500">
                          (Im Angebot)
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-2 p-0">
                    <p className="text-sm">Menge: {item.quantity || 1}</p>
                    <p className="text-sm">
                      Einzelpreis: {item.price.toFixed(2)} €
                    </p>
                    <p className="font-semibold">
                      Gesamt: {(item.price * (item.quantity || 1)).toFixed(2)} €
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-left">
            <p className="text-sm">
              Zwischensumme: {calculations.subtotalBrutto.toFixed(2)} €
            </p>
            <p className="text-sm">
              MwSt. (19%): {calculations.mwstAmount.toFixed(2)} €
            </p>
            <p className="text-sm">Versandkosten: 5.99 €</p>
            <p className="text-xl font-semibold">
              Gesamt: {calculations.totalWithShipping.toFixed(2)} €
            </p>
          </div>
          <Button
            variant="default"
            onClick={handleCheckout}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Wird verarbeitet...' : 'Bestellung abschließen'}
          </Button>
        </div>
      )}

      {pdfUrl && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Rechnung</h2>
          <div className="relative h-[500px] w-full">
            <iframe
              src={pdfUrl}
              title="Rechnung"
              className="h-full w-full rounded-md border"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <a href={pdfUrl} download="Rechnung.pdf">
              <Button variant="outline">Rechnung herunterladen</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
