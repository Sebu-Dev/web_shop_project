import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateInvoicePDF } from '@/utils/generateInvoicePDF';
import { Order } from '@/types/OrderType';
import { useState } from 'react';
import { useGetOrders } from '@/hooks/useGetOrders';
import { useUserSession } from '@/store/useUserSessionStore';

// Testdaten (später vom Backend ersetzt)
const testUser = {
  id: 'user123',
  name: 'Max Mustermann',
  email: 'max.mustermann@example.com',
};

export const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState<{
    pdfUrl: string;
    orderNumber: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserSession();

  // userId als String oder leerer String, falls nicht vorhanden
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrders(user?.id?.toString() || '');

  const handleGenerateInvoice = async (order: Order) => {
    setLoading(true);
    try {
      const pdfUrl = await generateInvoicePDF(order);
      setSelectedOrder({ pdfUrl, orderNumber: order.orderNumber });
    } catch (err) {
      console.error('Fehler beim Generieren der Rechnung:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  if (isLoading) {
    return <div className="py-8 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        Fehler beim Abrufen der Bestellungen.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Bestellverlauf</h1>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Eingeloggt als: {user?.username || testUser.name} (
          {user?.email || testUser.email})
        </p>
      </div>

      {!orders || orders.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          Noch keine Bestellungen vorhanden.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {orders.map((order) => (
              <Card key={order.orderNumber} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Bestellung vom {formatDate(order.date)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600">
                    Gesamtpreis (inkl. Versand):{' '}
                    {order.totalWithShipping.toFixed(2)} €
                  </p>
                  <p className="text-sm text-gray-600">
                    Artikel: {order.items.length}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => handleGenerateInvoice(order)}
                    disabled={loading}
                  >
                    {loading && selectedOrder?.orderNumber === order.orderNumber
                      ? 'Lädt...'
                      : 'Rechnung anzeigen'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedOrder && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">
                Rechnungsvorschau
              </h2>
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
                  download={`Rechnung_${selectedOrder.orderNumber}.pdf`}
                >
                  <Button variant="outline">Rechnung herunterladen</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
