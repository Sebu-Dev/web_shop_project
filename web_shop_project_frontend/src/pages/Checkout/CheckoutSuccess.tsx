import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl as string | undefined;

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold md:text-3xl">
            Bestellung erfolgreich!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine
            Bestellbestätigung per E-Mail.
          </p>

          {pdfUrl && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500">
                Ihre Rechnung steht zum Download bereit:
              </p>
              <div className="relative h-[500px] w-full">
                <iframe
                  src={pdfUrl}
                  title="Rechnung"
                  className="h-full w-full rounded-md border"
                />
              </div>
              <a href={pdfUrl} download="Rechnung.pdf">
                <Button variant="outline">Rechnung herunterladen</Button>
              </a>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              variant="default"
              onClick={handleContinueShopping}
              className="w-full md:w-auto"
            >
              Weiter einkaufen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
