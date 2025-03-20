import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateInvoicePDF } from '@/utils/generateInvoicePDF';
import { Order } from '@/types/OrderType';
import { useState, useEffect } from 'react';
import { useGetOrders } from '@/hooks/useGetOrders';
import { useUserSession } from '@/store/useUserSessionStore';

// Testdaten (später vom Backend ersetzt)
const testUser = {
  id: 'user123',
  name: 'Max Mustermann',
  email: 'max.mustermann@example.com',
};

export const OrderHistory = () => {
  const [selectedOrderPdfUrl, setSelectedOrderPdfUrl] = useState<string | null>(
    null
  );
  const { user } = useUserSession();
  const [loading, setLoading] = useState<boolean>(false);

  // Überprüfen, ob ein Benutzer angemeldet ist und die userId an den Hook übergeben
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrders(user?.id?.toString() || '');

  useEffect(() => {
    if (!user?.id) {
      console.log('Kein Benutzer eingeloggt');
    }
  }, [user]);

  const handleGenerateInvoice = async (order: Order) => {
    setLoading(true);
    try {
      const pdfUrl = await generateInvoicePDF(order); // Order enthält bereits alle Daten
      setSelectedOrderPdfUrl(pdfUrl);
    } catch (err) {
      console.error('Fehler beim Generieren der Rechnung:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Fehler beim Abrufen der Bestellungen.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Bestellverlauf</h1>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Eingeloggt als: {testUser.name} ({testUser.email})
        </p>
      </div>

      {orders && orders.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          Noch keine Bestellungen vorhanden.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {orders?.map((order) => (
              <Card key={order.orderNumber} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Bestellung vom{' '}
                    {new Date(order.date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                    {loading && selectedOrderPdfUrl === null
                      ? 'Lädt...'
                      : 'Rechnung anzeigen'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedOrderPdfUrl && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">
                Rechnungsvorschau
              </h2>
              <div className="relative h-[500px] w-full">
                <iframe
                  src={selectedOrderPdfUrl}
                  title="Rechnung"
                  className="h-full w-full rounded-md border"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <a
                  href={selectedOrderPdfUrl}
                  download={`Rechnung_${new Date().toISOString()}.pdf`}
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
