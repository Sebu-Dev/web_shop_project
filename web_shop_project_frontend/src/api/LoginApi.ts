import axios from 'axios';
import { API_USERS } from '@/config/Api';
import { RegisterUserInput } from '@/types/User';

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

const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// Hilfsfunktion zum Speichern des Tokens im LocalStorage
const saveAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Login-Request mit axios
export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API_USERS.LOGIN_URL, credentials, {
      withCredentials: true, // Cookies werden automatisch mitgeschickt
    });

    console.log('Erfolgreich eingeloggt', response.data);

    // JWT-Token aus der Antwort speichern
    if (response.data.token) {
      saveAuthToken(response.data.token);
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};

// Logout-Request mit axios
export const logout = async () => {
  try {
    const response = await axios.post(
      API_USERS.LOGOUT_URL,
      {},
      {
        withCredentials: true, // Cookies mit der Anfrage senden
      }
    );

    if (response.status === 200) {
      // Cookie im Frontend löschen
      removeAuthToken();
      console.log('Erfolgreich ausgeloggt');
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    handleError(error); // Hier wird der Fehler an handleError weitergegeben
  }
};

// Delete-Request für den Benutzer
export const deleteUser = async () => {
  try {
    const response = await axios.delete(API_USERS.DELETE_URL, {
      withCredentials: true, // Cookies mit der Anfrage senden
    });

    if (response.status === 200) {
      // Cookie im Frontend löschen
      removeAuthToken();
      console.log('Benutzer erfolgreich gelöscht');
    } else {
      throw new Error('User deletion failed');
    }
  } catch (error) {
    handleError(error); // Hier wird der Fehler an handleError weitergegeben
  }
};

// Update-Request für den Benutzer
export const update = async () => {
  try {
    const response = await axios.put(
      API_USERS.UPDATE_URL,
      {},
      {
        withCredentials: true, // Cookies mit der Anfrage senden
      }
    );

    if (response.status === 200) {
      // Cookie im Frontend löschen
      removeAuthToken();
      console.log('Benutzer erfolgreich aktualisiert');
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    handleError(error); // Hier wird der Fehler an handleError weitergegeben
  }
};

// Register-Request für den Benutzer
export const register = async (userData: RegisterUserInput) => {
  try {
    const response = await axios.post(API_USERS.REGISTER_URL, userData, {
      withCredentials: true, // Cookies mit der Anfrage senden
    });

    console.log('Benutzer erfolgreich registriert', response.data);

    // Optional: Token speichern (falls zurückgegeben)
    if (response.data.token) {
      saveAuthToken(response.data.token);
      return response.data;
    }
  } catch (error) {
    handleError(error); // Hier wird der Fehler an handleError weitergegeben
  }
};
