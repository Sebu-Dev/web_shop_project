import { API_PRODUCTS } from '@/config/Api';
import axios from 'axios';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios Fehler:', error.response?.data || error.message);
  } else {
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
