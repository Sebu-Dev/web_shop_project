import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateInvoicePDF } from '@/utils/generateInvoicePDF';
import { Order } from '@/types/OrderType';
import { useState } from 'react';

// Testdaten (später vom Backend ersetzt)
const testUser = {
  id: 'user123',
  name: 'Max Mustermann',
  email: 'max.mustermann@example.com',
};

// Beispiel-Testdaten für Orders (angepasst an den neuen Order-Typ)
const testOrders: Order[] = [
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

export const OrderHistory = () => {
  const [selectedOrderPdfUrl, setSelectedOrderPdfUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const orders = testOrders;

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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Bestellverlauf</h1>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Eingeloggt als: {testUser.name} ({testUser.email})
        </p>
      </div>

      {orders.length === 0 ? (
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
