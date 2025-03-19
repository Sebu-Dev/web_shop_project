import { API_PRODUCTS } from '@/config/Api';
import axios from 'axios';

// Hilfsfunktion zur Behandlung von Fehlern mit Typisierung
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Hier nutzen wir den Typ AxiosError für eine präzise Fehlerbehandlung
    console.error('Axios Fehler:', error.response?.data || error.message);
  } else {
    // Wenn der Fehler kein AxiosError ist, behandeln wir ihn als allgemeinen Fehler
    console.error('Unbekannter Fehler:', error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_PRODUCTS.BASE_URL);

    if (response.data) {
      console.log('Product erfolgreich geladen', response.data);
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};
