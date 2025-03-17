const { Pool } = require('pg');
const fetch = require('node-fetch');

// Funktion zum Warten auf die Datenbankverbindung
async function connectToDatabase() {
    let attempts = 0;
    const maxAttempts = 15;
    while (attempts < maxAttempts) {
        try {
            const client = await pool.connect();
            console.log('Verbindung zur Datenbank erfolgreich hergestellt');
            return client;
        } catch (err) {
            console.log(`Verbindung fehlgeschlagen (Versuch ${attempts + 1}/${maxAttempts}):`, err.message);
            await new Promise(resolve => setTimeout(resolve, 5000));
            attempts++;
        }
    }
    throw new Error(`Konnte nach ${maxAttempts} Versuchen keine Verbindung zur Datenbank herstellen`);
}

// Funktion zum Warten auf die Backend-Dienste
async function waitForBackends() {
    const services = [
        { name: 'user-service', url: 'http://user-service:8001/health' },
        { name: 'product-service', url: 'http://product-service:8002/health' },
        { name: 'order-service', url: 'http://order-service:8003/health' },
    ];
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
        let allReady = true;
        for (const service of services) {
            try {
                const response = await fetch(service.url);
                if (response.ok) {
                    console.log(`${service.name} ist bereit`);
                } else {
                    allReady = false;
                    console.log(`${service.name} nicht bereit (Status: ${response.status})`);
                }
            } catch (err) {
                allReady = false;
                console.log(`${service.name} nicht erreichbar:`, err.message);
            }
        }
        if (allReady) {
            console.log('Alle Backend-Dienste sind bereit');
            return;
        }
        console.log(`Warte auf Backend-Dienste (Versuch ${attempts + 1}/${maxAttempts})...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
    }
    throw new Error(`Backend-Dienste waren nach ${maxAttempts} Versuchen nicht bereit`);
}

// Funktion zum Warten auf die Existenz der Tabellen
async function waitForTables(client) {
    const tables = ['users', 'products', 'orders', 'order_items'];
    let attempts = 0;
    const maxAttempts = 30;
    while (attempts < maxAttempts) {
        try {
            const res = await client.query(`
                SELECT table_name FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name IN ('users', 'products', 'orders', 'order_items')
            `);
            const foundTables = res.rows.map(row => row.table_name);
            if (foundTables.length === tables.length) {
                console.log('Alle erforderlichen Tabellen sind vorhanden:', foundTables);
                return;
            } else {
                console.log(`Tabellen noch nicht vollständig erstellt. Gefunden: ${foundTables}, Erwartet: ${tables}`);
            }
        } catch (err) {
            console.log('Fehler beim Überprüfen der Tabellen:', err.message);
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
    }
    throw new Error(`Tabellen wurden nach ${maxAttempts} Versuchen nicht vollständig erstellt`);
}

const { Pool } = require('pg');

const pool = new Pool({
    user: 'pornoPeter',
    host: 'postgres',
    database: 'shop_db',
    password: 'SwordfishSQL',
    port: 5432,
});

async function waitForPostgres(maxAttempts = 30, delay = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await pool.query('SELECT 1');
            console.log('Datenbank erreichbar');
            return true;
        } catch (error) {
            console.log(`Datenbank nicht erreichbar: ${error.message}`);
            console.log(`Warte auf Datenbank (Versuch ${attempt}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Datenbank nach 30 Versuchen nicht erreichbar');
}

(async () => {
    try {
        await waitForPostgres();
        console.log('Datenbank bereit, starte Seeding...');
        let client;
        // Verbindung herstellen, auf Backends und Tabellen warten
        client = await connectToDatabase();
        await waitForBackends();
        await waitForTables(client);
        console.log('Starte Datenbank-Befüllung...');

        // Transaktion starten
        await client.query('BEGIN');
        console.log('Transaktion gestartet');

        // Datenbank leeren
        await client.query('DELETE FROM order_items');
        console.log('Tabelle order_items geleert');
        await client.query('DELETE FROM orders');
        console.log('Tabelle orders geleert');
        await client.query('DELETE FROM products');
        console.log('Tabelle products geleert');
        await client.query('DELETE FROM users');
        console.log('Tabelle users geleert');

        // Benutzer einfügen
        await client.query(`
            INSERT INTO users (username, password_hash, email, address, role) VALUES
            ('admin1', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'admin1@example.com', 'Admin Straße 1', 'ADMIN'),
            ('user1', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'user1@example.com', 'User Straße 1', 'USER'),
            ('user2', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'user2@example.com', 'User Straße 2', 'USER');
        `);
        console.log('Benutzer erfolgreich eingefügt');

        // 20 Produkte einfügen
        await client.query(`
            INSERT INTO products (name, price, image_url) VALUES
            ('Laptop Pro', 1299.99, 'https://picsum.photos/200/300?random=1'),
            ('Smartphone X', 699.99, 'https://picsum.photos/200/300?random=2'),
            ('Wireless Headphones', 149.99, 'https://picsum.photos/200/300?random=3'),
            ('4K Monitor', 299.99, 'https://picsum.photos/200/300?random=4'),
            ('Mechanical Keyboard', 89.99, 'https://picsum.photos/200/300?random=5'),
            ('Gaming Mouse', 59.99, 'https://picsum.photos/200/300?random=6'),
            ('Smartwatch', 199.99, 'https://picsum.photos/200/300?random=7'),
            ('Tablet', 399.99, 'https://picsum.photos/200/300?random=8'),
            ('Portable Speaker', 79.99, 'https://picsum.photos/200/300?random=9'),
            ('External SSD 1TB', 129.99, 'https://picsum.photos/200/300?random=10'),
            ('Webcam HD', 69.99, 'https://picsum.photos/200/300?random=11'),
            ('USB-C Hub', 39.99, 'https://picsum.photos/200/300?random=12'),
            ('Wireless Charger', 29.99, 'https://picsum.photos/200/300?random=13'),
            ('Desk Lamp', 49.99, 'https://picsum.photos/200/300?random=14'),
            ('Ergonomic Chair', 249.99, 'https://picsum.photos/200/300?random=15'),
            ('Mouse Pad XL', 19.99, 'https://picsum.photos/200/300?random=16'),
            ('Bluetooth Earbuds', 99.99, 'https://picsum.photos/200/300?random=17'),
            ('Power Bank 10000mAh', 34.99, 'https://picsum.photos/200/300?random=18'),
            ('Gaming Console', 499.99, 'https://picsum.photos/200/300?random=19'),
            ('VR Headset', 349.99, 'https://picsum.photos/200/300?random=20');
        `);
        console.log('20 Produkte erfolgreich eingefügt');

        // Bestellungen einfügen
        await client.query(`
            INSERT INTO orders (user_id) VALUES
            ((SELECT id FROM users WHERE username = 'user1')),
            ((SELECT id FROM users WHERE username = 'user2'));
        `);
        console.log('Bestellungen erfolgreich eingefügt');

        // Order Items einfügen
        await client.query(`
            INSERT INTO order_items (order_id, product_id, quantity) VALUES
            ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Laptop Pro'), 1),
            ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Wireless Headphones'), 2),
            ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Mouse Pad XL'), 1),
            ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user2') LIMIT 1), (SELECT id FROM products WHERE name = 'Smartphone X'), 1),
            ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user2') LIMIT 1), (SELECT id FROM products WHERE name = 'Bluetooth Earbuds'), 1);
        `);
        console.log('Order Items erfolgreich eingefügt');

        // Transaktion abschließen
        await client.query('COMMIT');
        console.log('Transaktion abgeschlossen - Datenbank erfolgreich befüllt');
    
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
})();



