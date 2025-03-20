import { Order } from '@/types/OrderType';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logoImage from '@/assets/logo.png';

export const generateInvoicePDF = async (order: Order): Promise<string> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = { title: 20, subtitle: 14, normal: 12, small: 10 };

    // Logo
    const logoBytes = await fetch(logoImage).then((res) => res.arrayBuffer());
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.2);
    page.drawImage(logo, {
      x: 50,
      y: height - 50 - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Rechnungsdatum
    const formattedDate = new Date(order.date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    page.drawText(`Rechnung vom ${formattedDate}`, {
      x: width - 280,
      y: height - 80,
      size: fontSize.title,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // Shop-Adresse
    const shopAddress = [
      'Günthers Rabattrakete',
      'Rabattstraße 42',
      '12345 Raketenstadt',
      'Deutschland',
      'E-Mail: guenther@rabattrakete.de',
      'USt-IdNr.: DE123456789',
    ];
    let yPosition = height - 100;
    shopAddress.forEach((line, index) => {
      page.drawText(line, {
        x: width - 200,
        y: yPosition - index * 12,
        size: fontSize.small,
        font,
        color: rgb(0, 0, 0),
      });
    });

    // Bestellübersicht
    const headerHeight = Math.max(logoDims.height + 180, 100);
    yPosition = height - headerHeight - 20;
    page.drawText('Bestellübersicht:', {
      x: 50,
      y: yPosition,
      size: fontSize.subtitle,
      font: fontBold,
    });
    yPosition -= 20;

    // Tabellenkopf
    page.drawText('Menge', {
      x: 50,
      y: yPosition,
      size: fontSize.normal,
      font: fontBold,
    });
    page.drawText('Artikel', {
      x: 100,
      y: yPosition,
      size: fontSize.normal,
      font: fontBold,
    });
    page.drawText('Netto', {
      x: 400,
      y: yPosition,
      size: fontSize.normal,
      font: fontBold,
    });
    page.drawText('Brutto', {
      x: 500,
      y: yPosition,
      size: fontSize.normal,
      font: fontBold,
    });
    yPosition -= 15;
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: width - 50, y: yPosition },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    yPosition -= 10;

    // Artikel
    order.items.forEach((item) => {
      const quantity = item.quantity || 1;
      const bruttoPrice = item.price;
      const nettoPrice = bruttoPrice / (1 + order.mwstRate);
      const totalNetto = nettoPrice * quantity;
      const totalBrutto = bruttoPrice * quantity;

      page.drawText(quantity.toString(), {
        x: 50,
        y: yPosition,
        size: fontSize.normal,
        font,
      });
      page.drawText(item.name, {
        x: 100,
        y: yPosition,
        size: fontSize.normal,
        font,
      });
      page.drawText(`${totalNetto.toFixed(2)} €`, {
        x: 400,
        y: yPosition,
        size: fontSize.normal,
        font,
      });
      page.drawText(`${totalBrutto.toFixed(2)} €`, {
        x: 500,
        y: yPosition,
        size: fontSize.normal,
        font,
      });
      yPosition -= 15;
    });

    // Linie
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: width - 50, y: yPosition },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;

    // Berechnungen
    page.drawText(
      `Zwischensumme (Netto): ${(order.subtotalBrutto / (1 + order.mwstRate)).toFixed(2)} €`,
      {
        x: 350,
        y: yPosition,
        size: fontSize.normal,
        font,
      }
    );
    yPosition -= 15;
    page.drawText(`MwSt. (19%): ${order.mwstAmount.toFixed(2)} €`, {
      x: 350,
      y: yPosition,
      size: fontSize.normal,
      font,
    });
    yPosition -= 15;
    page.drawText(`Versandkosten: ${order.shippingCosts.toFixed(2)} €`, {
      x: 350,
      y: yPosition,
      size: fontSize.normal,
      font,
    });
    yPosition -= 20;
    page.drawText(`Gesamtbetrag: ${order.totalWithShipping.toFixed(2)} €`, {
      x: 350,
      y: yPosition,
      size: fontSize.subtitle,
      font: fontBold,
    });

    // Fußzeile
    page.drawText('Vielen Dank für Ihren Einkauf bei Günthers Rabattrakete!', {
      x: 50,
      y: 50,
      size: fontSize.small,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error('Fehler beim Erstellen der PDF: ' + errorMessage);
  }
};
