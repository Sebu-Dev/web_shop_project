import axios from 'axios';
import { API_USERS } from '@/config/Api';
import { RegisterUserInput, UpdateUserType, UserType } from '@/types/User';
import { useUserSession } from '@/store/useUserSessionStore';

// Hilfsfunktion zur Behandlung von Fehlern mit Typisierung
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios Fehler:', error.response?.data || error.message);
  } else {
    console.error('Unbekannter Fehler:', error);
  }
};
const getUserId = (): number => {
  const user = useUserSession.getState().user;
  if (user === null) {
    throw new Error('User not logged in');
  }
  return user.id;
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

    if (response.data) {
      console.log('Erfolgreich eingeloggt', response.data);
      return response.data;
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Delete-Request für den Benutzer
export const deleteUser = async () => {
  try {
    const response = await axios.delete(
      API_USERS.DELETE_URL + '/' + getUserId(),
      {
        withCredentials: true, // Cookies mit der Anfrage senden
      }
    );

    if (response.status === 200) {
      console.log('Benutzer erfolgreich gelöscht');
    } else {
      throw new Error('User deletion failed');
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateUserApiCall = async (
  newUser: UpdateUserType
): Promise<UserType> => {
  const response = await axios.put(
    API_USERS.UPDATE_URL + '/' + getUserId(),
    newUser,
    {
      withCredentials: true,
    }
  );

  if (response.status === 200 && response.data) {
    console.log('Benutzer erfolgreich aktualisiert');
    return response.data;
  } else {
    throw new Error('Update failed');
  }
};

// Register-Request für den Benutzer
export const register = async (userData: RegisterUserInput) => {
  try {
    const response = await axios.post(API_USERS.REGISTER_URL, userData, {
      withCredentials: true, // Cookies mit der Anfrage senden
    });

    if (response.data) {
      console.log('Benutzer erfolgreich registriert', response.data);

      return response.data;
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};
