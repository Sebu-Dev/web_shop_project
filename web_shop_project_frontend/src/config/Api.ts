export const API_USERS = {
  BASE_URL: 'http://localhost:8001/api/users',
  LOGIN_URL: 'http://localhost:8001/api/users/login',
  REGISTER_URL: 'http://localhost:8001/api/users/register',
  DELETE_URL: 'http://localhost:8001/api/users', // Basis-URL, id wird dynamisch hinzugefügt
  UPDATE_URL: 'http://localhost:8001/api/users', // Basis-URL, id wird dynamisch hinzugefügt
  ORDER_HISTORY_URL: 'http://localhost:8003/api/orders/user',
  ORDER: 'http://localhost:8003/api/orders',
  ORDER_DETAILS: 'http://localhost:8003/api/orders',
};
export const API_PRODUCTS = {
  BASE_URL: 'http://localhost:8002/api/products',
  DELETE_URL: 'http://localhost:8002/api/products',
  GET_PAGINATION:
    'http://localhost:8002/api/products/pagination/?page=0&size=10',
  UPDATE_URL: 'http://localhost:8002/api/products',
};
