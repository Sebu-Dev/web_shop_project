import { ProductType } from '@/types/ProductType';
import { PDFDocument, rgb } from 'pdf-lib';

export const generateInvoicePDF = async (
  cart: ProductType[],
  totalPrice: number
): Promise<string> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();
    const fontSize = {
      title: 20,
      subtitle: 14,
      normal: 12,
    };

    // Header
    page.drawText('Rechnung', {
      x: 50,
      y: height - 50,
      size: fontSize.title,
      color: rgb(0, 0, 0),
    });

    // Order details
    let yPosition = height - 80;
    page.drawText('Bestellübersicht:', {
      x: 50,
      y: yPosition,
      size: fontSize.subtitle,
    });
    yPosition -= 20;

    cart.forEach((item) => {
      const quantity = item.quantity || 1;
      const line = `${item.name} – ${quantity} x ${item.price.toFixed(2)} € = ${(
        item.price * quantity
      ).toFixed(2)} €`;
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: fontSize.normal,
      });
      yPosition -= 15;
    });

    // Total
    page.drawText(`Gesamt: ${totalPrice.toFixed(2)} €`, {
      x: 50,
      y: yPosition - 10,
      size: fontSize.subtitle,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    throw new Error('Fehler beim Erstellen der PDF: ' + errorMessage);
  }
};
