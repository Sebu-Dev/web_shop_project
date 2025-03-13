const fetch = require('node-fetch');
const tough = require('tough-cookie');
const CookieJar = new tough.CookieJar();

const USER_SERVICE_URL = 'http://localhost:8001/api/users';
const PRODUCT_SERVICE_URL = 'http://localhost:8002/api/products';
const ORDER_SERVICE_URL = 'http://localhost:8003/api/orders';

async function request(url, method, body = null, useCookies = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (useCookies) {
        const cookies = await CookieJar.getCookies(url);
        if (cookies.length) headers['Cookie'] = cookies.map(c => `${c.key}=${c.value}`).join('; ');
    }
    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: 'include'
    });
    const setCookieHeaders = response.headers.raw()['set-cookie'];
    if (setCookieHeaders) {
        for (const cookie of setCookieHeaders) await CookieJar.setCookie(cookie, url);
    }
    return response.ok ? response.json() : Promise.reject(response.statusText);
}

async function seed() {
    try {
        console.log('Seeding...');

        // Benutzerdaten
        const users = [
            { username: 'user1', password: 'password1', email: 'user1@example.com', address: 'Hauptstraße 1, Berlin', role: 'ROLE_USER' },
            { username: 'user2', password: 'password2', email: 'user2@example.com', address: 'Bahnhofstraße 2, München', role: 'ROLE_USER' },
            { username: 'user3', password: 'password3', email: 'user3@example.com', address: 'Schillerstraße 3, Leipzig', role: 'ROLE_USER' },
            { username: 'user4', password: 'password4', email: 'user4@example.com', address: 'Kaiserstraße 4, Stuttgart', role: 'ROLE_USER' },
            { username: 'user5', password: 'password5', email: 'user5@example.com', address: 'Goethestraße 5, Köln', role: 'ROLE_USER' },
            { username: 'admin1', password: 'admin123', email: 'admin1@example.com', address: 'Adminweg 1, Berlin', role: 'ROLE_ADMIN' }
        ];

        const userIds = new Map(); // Map für klarere Zuordnung
        for (const user of users) {
            try {
                const response = await request(`${USER_SERVICE_URL}/register`, 'POST', {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    address: user.address,
                    role: user.role
                });
                userIds.set(user.username, response.id);
                console.log(`Benutzer ${user.username} registriert mit ID ${response.id} und Rolle ${user.role}`);
            } catch (e) {
                console.log(`${user.username} bereits vorhanden: ${e}`);
            }
        }

        // 20 Produkte
        await request(`${USER_SERVICE_URL}/login`, 'POST', { username: 'admin1', password: 'admin123' });
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
            { name: 'Smart Home Hub', image: 'https://example.com/smarthome.jpg', price: 89.99, onSale: false, description: 'Zentrale für Smart Home Geräte' }
        ];

        const productIds = new Map(); // Map für klarere Zuordnung
        for (const product of products) {
            try {
                const response = await request(PRODUCT_SERVICE_URL, 'POST', product, true);
                productIds.set(product.name, response.id);
                console.log(`${product.name} hinzugefügt mit ID ${response.id}`);
            } catch (e) {
                console.log(`${product.name} bereits vorhanden: ${e}`);
            }
        }

        // Bestellungen mit numerischen IDs
        const orders = [
            {
                userId: userIds.get('user1'), // Numerische ID von user1
                items: [
                    { productId: productIds.get('Gaming Laptop'), quantity: 1, price: 1299.99 },
                    { productId: productIds.get('Bluetooth Kopfhörer'), quantity: 2, price: 89.99 }
                ],
                totalPrice: 1299.99 + (89.99 * 2) // 1479.97
            },
            {
                userId: userIds.get('user2'), // Numerische ID von user2
                items: [
                    { productId: productIds.get('Smartphone Pro'), quantity: 1, price: 699.99 },
                    { productId: productIds.get('Mechanische Tastatur'), quantity: 1, price: 119.99 }
                ],
                totalPrice: 699.99 + 119.99 // 819.98
            },
            {
                userId: userIds.get('user3'), // Numerische ID von user3
                items: [
                    { productId: productIds.get('4K Monitor'), quantity: 1, price: 349.99 },
                    { productId: productIds.get('Smartwatch'), quantity: 1, price: 199.99 }
                ],
                totalPrice: 349.99 + 199.99 // 549.98
            },
            {
                userId: userIds.get('user4'), // Numerische ID von user4
                items: [
                    { productId: productIds.get('Externer SSD'), quantity: 1, price: 149.99 },
                    { productId: productIds.get('Gaming Maus'), quantity: 2, price: 59.99 }
                ],
                totalPrice: 149.99 + (59.99 * 2) // 269.97
            },
            {
                userId: userIds.get('user5'), // Numerische ID von user5
                items: [
                    { productId: productIds.get('Webcam HD'), quantity: 1, price: 79.99 },
                    { productId: productIds.get('Bluetooth Lautsprecher'), quantity: 1, price: 129.99 },
                    { productId: productIds.get('Wireless Charger'), quantity: 1, price: 29.99 }
                ],
                totalPrice: 79.99 + 129.99 + 29.99 // 239.97
            }
        ];

        for (const order of orders) {
            const user = users.find(u => userIds.get(u.username) === order.userId);
            await request(`${USER_SERVICE_URL}/login`, 'POST', { username: user.username, password: user.password });
            try {
                await request(ORDER_SERVICE_URL, 'POST', order, true);
                console.log(`Bestellung für userId ${order.userId} hinzugefügt`);
            } catch (e) {
                console.log(`Bestellung für userId ${order.userId} bereits vorhanden: ${e}`);
            }
        }

        console.log('Seeding abgeschlossen!');
    } catch (error) {
        console.error('Fehler beim Seeding:', error);
    }
}

seed();