import { Order, OrderRequest } from '@/types/OrderType';
import { API_USERS } from '../config/Api';

// POST: Bestellung erstellen
export const createOrder = async (order: OrderRequest): Promise<Order> => {
  try {
    console.log('Order being sent:', order);
    const response = await fetch(API_USERS.ORDER, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Fehler beim Erstellen der Bestellung');
    }

    const createdOrder: Order = await response.json();
    return createdOrder;
  } catch (error) {
    console.error('Fehler beim Erstellen der Bestellung:', error);
    throw error;
  }
};

// GET: Alle Bestellungen abrufen (optional gefiltert nach userId)
export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const url = userId ? `${API_USERS.ORDER}/user/${userId}` : API_USERS.ORDER;
    console.log('Fetching orders for userId:', userId);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Bestellungen');
    }

    const orders: Order[] = await response.json();
    return orders;
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    throw error;
  }
};

// GET: Einzelne Bestellung abrufen
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_USERS.ORDER}/${orderId}`);

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Bestellung');
    }

    const order: Order = await response.json();
    return order;
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellung:', error);
    throw error;
  }
};
