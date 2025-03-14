const fetch = require('node-fetch');
const tough = require('tough-cookie');
const { Client } = require('pg');

const CookieJar = new tough.CookieJar();

const USER_SERVICE_URL = 'http://user-service:8001/api/users';
const PRODUCT_SERVICE_URL = 'http://product-service:8002/api/products';
const ORDER_SERVICE_URL = 'http://order-service:8003/api/orders';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function connectWithRetry() {
  while (true) {
    try {
      await client.connect();
      console.log('Verbunden mit der Datenbank');
      break;
    } catch (err) {
      console.error('Verbindung fehlgeschlagen, erneuter Versuch in 5 Sekunden...', err);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

async function clearDatabase() {
  try {
    console.log('Leere die Datenbank...');
    await client.query('TRUNCATE TABLE orders, products, users RESTART IDENTITY CASCADE;');
    console.log('Datenbank erfolgreich geleert');
  } catch (err) {
    console.error('Fehler beim Leeren der Datenbank:', err);
    throw err;
  }
}

async function request(url, method, body = null, auth = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    headers['Authorization'] = auth;
    console.log(`Sende Authorization-Header für ${url}: ${auth.substring(0, 20)}...`);
  }
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Fehlerantwort von ${url}: ${errorText}`);
    throw new Error(`Request fehlgeschlagen mit Status ${response.status}: ${errorText}`);
  }
  return response.json();
}

async function seed() {
  console.log('Seeding beginnt...');

  // Benutzerdaten
  const users = [
    { username: 'user1', password: 'password1', email: 'user1@example.com', address: 'Hauptstraße 1, Berlin', role: 'USER' },
    { username: 'user2', password: 'password2', email: 'user2@example.com', address: 'Bahnhofstraße 2, München', role: 'USER' },
    { username: 'user3', password: 'password3', email: 'user3@example.com', address: 'Schillerstraße 3, Leipzig', role: 'USER' },
    { username: 'user4', password: 'password4', email: 'user4@example.com', address: 'Kaiserstraße 4, Stuttgart', role: 'USER' },
    { username: 'user5', password: 'password5', email: 'user5@example.com', address: 'Goethestraße 5, Köln', role: 'USER' },
    { username: 'admin1', password: 'admin123', email: 'admin1@example.com', address: 'Adminweg 1, Berlin', role: 'ADMIN' },
  ];

  const userIds = new Map();
  for (const user of users) {
    const response = await request(`${USER_SERVICE_URL}/register`, 'POST', {
      username: user.username,
      password: user.password,
      email: user.email,
      address: user.address,
      role: user.role,
    });
    userIds.set(user.username, response.id);
    console.log(`Benutzer ${user.username} registriert mit ID ${response.id} und Rolle ${user.role}`);
  }

  // Basic Auth für product-service mit admin1
  const basicAuth = 'Basic ' + Buffer.from('admin1:admin123').toString('base64');

  // Produkte
  const products = [
    { name: 'Gaming Laptop', image: 'https://example.com/laptop.jpg', price: 1299.99, onSale: true, description: 'RTX 3080 Laptop' },
    { name: 'Smartphone Pro', image: 'https://example.com/phone.jpg', price: 699.99, onSale: false, description: '5G Smartphone mit 128GB' },
    { name: 'Bluetooth Kopfhörer', image: 'https://example.com/headphones.jpg', price: 89.99, onSale: true, description: 'Noise-Cancelling Kopfhörer' },
    { name: '4K Monitor', image: 'https://example.com/monitor.jpg', price: 349.99, onSale: false, description: '27-Zoll 4K Monitor' },
    { name: 'Mechanische Tastatur', image: 'https://example.com/keyboard.jpg', price: 119.99, onSale: true, description: 'RGB Tastatur' },
    { name: 'Smartwatch', image: 'https://example.com/smartwatch.jpg', price: 199.99, onSale: false, description: 'Fitness-Tracker mit GPS' },
    { name: 'Externer SSD', image: 'https://example.com/ssd.jpg', price: 149.99, onSale: true, description: '1TB NVMe SSD' },
    { name: 'Gaming Maus', image: 'https://example.com/mouse.jpg', price: 59.99, onSale: false, description: 'Ergonomische Maus mit DPI-Regler' },
    { name: 'Webcam HD', image: 'https://example.com/webcam.jpg', price: 79.99, onSale: true, description: '1080p Webcam mit Mikrofon' },
    { name: 'Bluetooth Lautsprecher', image: 'https://example.com/speakers.jpg', price: 129.99, onSale: false, description: 'Bluetooth 5.0 Lautsprecher' },
    { name: 'Grafikkarte RTX 4090', image: 'https://example.com/gpu.jpg', price: 1599.99, onSale: true, description: 'High-End Grafikkarte' },
    { name: 'Tablet 10 Zoll', image: 'https://example.com/tablet.jpg', price: 299.99, onSale: false, description: 'Tablet mit 64GB Speicher' },
    { name: 'USB-C Hub', image: 'https://example.com/hub.jpg', price: 39.99, onSale: true, description: 'Multiport USB-C Adapter' },
    { name: 'Gaming Headset', image: 'https://example.com/headset.jpg', price: 99.99, onSale: false, description: 'Surround-Sound Headset' },
    { name: 'E-Book Reader', image: 'https://example.com/ereader.jpg', price: 129.99, onSale: true, description: 'Wasserdichter E-Reader' },
    { name: 'Tragbarer Monitor', image: 'https://example.com/portable.jpg', price: 249.99, onSale: false, description: '15,6-Zoll tragbarer Monitor' },
    { name: 'Wireless Charger', image: 'https://example.com/charger.jpg', price: 29.99, onSale: true, description: '10W kabelloses Ladegerät' },
    { name: 'Action Kamera', image: 'https://example.com/camera.jpg', price: 199.99, onSale: false, description: '4K Action Kamera' },
    { name: 'Router Wi-Fi 6', image: 'https://example.com/router.jpg', price: 149.99, onSale: true, description: 'High-Speed Wi-Fi 6 Router' },
    { name: 'Smart Home Hub', image: 'https://example.com/smarthome.jpg', price: 89.99, onSale: false, description: 'Zentrale für Smart Home Geräte' },
  ];

  const productIds = new Map();
  for (const product of products) {
    const response = await request(PRODUCT_SERVICE_URL, 'POST', product, basicAuth);
    productIds.set(product.name, response.id);
    console.log(`${product.name} hinzugefügt mit ID ${response.id}`);
  }

  // Bestellungen (angenommen, order-service verwendet weiterhin JWT)
  const orders = [
    {
      userId: userIds.get('user1'),
      items: [
        { productId: productIds.get('Gaming Laptop'), quantity: 1, price: 1299.99 },
        { productId: productIds.get('Bluetooth Kopfhörer'), quantity: 2, price: 89.99 },
      ],
      totalPrice: 1299.99 + 89.99 * 2,
    },
    {
      userId: userIds.get('user2'),
      items: [
        { productId: productIds.get('Smartphone Pro'), quantity: 1, price: 699.99 },
        { productId: productIds.get('Mechanische Tastatur'), quantity: 1, price: 119.99 },
      ],
      totalPrice: 699.99 + 119.99,
    },
    {
      userId: userIds.get('user3'),
      items: [
        { productId: productIds.get('4K Monitor'), quantity: 1, price: 349.99 },
        { productId: productIds.get('Smartwatch'), quantity: 1, price: 199.99 },
      ],
      totalPrice: 349.99 + 199.99,
    },
    {
      userId: userIds.get('user4'),
      items: [
        { productId: productIds.get('Externer SSD'), quantity: 1, price: 149.99 },
        { productId: productIds.get('Gaming Maus'), quantity: 2, price: 59.99 },
      ],
      totalPrice: 149.99 + 59.99 * 2,
    },
    {
      userId: userIds.get('user5'),
      items: [
        { productId: productIds.get('Webcam HD'), quantity: 1, price: 79.99 },
        { productId: productIds.get('Bluetooth Lautsprecher'), quantity: 1, price: 129.99 },
        { productId: productIds.get('Wireless Charger'), quantity: 1, price: 29.99 },
      ],
      totalPrice: 79.99 + 129.99 + 29.99,
    },
  ];

  for (const order of orders) {
    const user = users.find((u) => userIds.get(u.username) === order.userId);
    const userLoginResponse = await fetch(`${USER_SERVICE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, password: user.password }),
    });
    const userSetCookieHeaders = userLoginResponse.headers.raw()['set-cookie'];
    let userAuthToken = null;
    if (userSetCookieHeaders) {
      for (const cookie of userSetCookieHeaders) await CookieJar.setCookie(cookie, USER_SERVICE_URL);
      const updatedCookies = await CookieJar.getCookies(`${USER_SERVICE_URL}/login`);
      const userAuthTokenCookie = updatedCookies.find(cookie => cookie.key === 'authToken');
      userAuthToken = userAuthTokenCookie ? userAuthTokenCookie.value : null;
    }
    if (!userAuthToken) throw new Error(`Kein authToken für ${user.username} erhalten`);
    const orderResponse = await request(ORDER_SERVICE_URL, 'POST', order, `Bearer ${userAuthToken}`);
    console.log(`Bestellung für userId ${order.userId} hinzugefügt mit ID ${orderResponse.id}`);
  }

  console.log('Seeding erfolgreich abgeschlossen!');
}

connectWithRetry()
  .then(async () => {
    try {
      await clearDatabase();
      await seed();
    } catch (err) {
      console.error('Fehler beim Seeding:', err);
    } finally {
      await client.end();
    }
  })
  .catch((err) => console.error('Fehler beim Seeding-Prozess:', err));