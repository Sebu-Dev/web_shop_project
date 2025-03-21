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
import { Order, OrderRequest } from '@/types/OrderType';
import { calculateOrder } from '@/utils/OrderCalculator';
import { useUserSession } from '@/store/useUserSessionStore';
import { usePostOrder } from '@/hooks/usePostOrder';

const CheckoutPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<{
    pdfUrl: string;
    order: Order;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart } = useCartStore();
  const { user } = useUserSession();
  const navigate = useNavigate();
  const { mutate: postOrder } = usePostOrder();

  const calculations = useMemo(() => calculateOrder(cart), [cart]);

  const handleCheckout = useCallback(async () => {
    if (!user) {
      setError('Bitte melden Sie sich an, um die Bestellung abzuschließen.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      const orderDate = new Date().toISOString();
      const orderRequest: OrderRequest = {
        userId: user.id,
        orderNumber: `order_${Date.now()}`,
        date: orderDate,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        subtotalBrutto: calculations.subtotalBrutto,
        mwstRate: 0.19,
        mwstAmount: calculations.mwstAmount,
        shippingCosts: 5.99,
        totalWithShipping: calculations.totalWithShipping,
      };

      // Sende die Bestellung ans Backend
      postOrder(orderRequest, {
        onSuccess: (createdOrder: Order) => {
          // Nach erfolgreichem POST das Order-Objekt mit ID verwenden
          const order: Order = {
            ...orderRequest,
            id: createdOrder.id, // ID vom Backend
            items: orderRequest.items.map((item, index) => ({
              id: createdOrder.items[index]?.id || 0, // IDs vom Backend oder Fallback
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              name: cart[index].name, // Zusätzliche Daten aus dem Cart für PDF
              description: cart[index].description,
              image: cart[index].image,
            })),
          };

          // PDF generieren und weiterleiten
          generateInvoicePDF(order).then((generatedPdfUrl) => {
            setSelectedOrder({ pdfUrl: generatedPdfUrl, order });
            clearCart();
            navigate('/checkout-success', {
              state: { pdfUrl: generatedPdfUrl, order },
            });
          });
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error('Checkout Fehler:', err);
    } finally {
      setLoading(false);
    }
  }, [
    user,
    cart,
    calculations.subtotalBrutto,
    calculations.mwstAmount,
    calculations.totalWithShipping,
    postOrder,
    clearCart,
    navigate,
  ]);

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
            disabled={loading || !user}
            className="w-full md:w-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Wird verarbeitet...' : 'Bestellung abschließen'}
          </Button>
        </div>
      )}

      {selectedOrder && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Rechnung</h2>
          <div className="relative h-[500px] w-full">
            <iframe
              src={selectedOrder.pdfUrl}
              title="Rechnung"
              className="h-full w-full rounded-md border"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <a
              href={selectedOrder.pdfUrl}
              download={`Rechnung_${selectedOrder.order.orderNumber}.pdf`}
            >
              <Button variant="outline">Rechnung herunterladen</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
