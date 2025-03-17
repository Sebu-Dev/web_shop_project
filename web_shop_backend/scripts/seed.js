const { Pool } = require('pg');
const axios = require('axios');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const backendServices = [
    'http://user-service:8001',
    'http://product-service:8002',
    'http://order-service:8003',
];

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

async function waitForBackend(serviceUrl, maxAttempts = 30, delay = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await axios.get(serviceUrl);
            console.log(`${serviceUrl} erreichbar`);
            return true;
        } catch (error) {
            console.log(`${serviceUrl} nicht erreichbar: ${error.message}`);
            console.log(`Warte auf ${serviceUrl} (Versuch ${attempt}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`${serviceUrl} nach 30 Versuchen nicht erreichbar`);
}

async function waitForAllBackends() {
    for (const service of backendServices) {
        await waitForBackend(service);
    }
    console.log('Alle Backend-Dienste sind gestartet');
}

async function seedDatabase() {
    try {
        console.log('Starte Seeding...');
        await pool.query('BEGIN');

        console.log('Füge Benutzer ein...');
        await pool.query(`
            INSERT INTO users (username, email, password) VALUES
            ('admin', 'admin@example.com', 'admin123'),
            ('user1', 'user1@example.com', 'user123'),
            ('user2', 'user2@example.com', 'user123')
            ON CONFLICT DO NOTHING;
        `);

        console.log('Füge Produkte ein...');
        await pool.query(`
            INSERT INTO products (name, description, price, stock) VALUES
            ('Laptop', 'High-end Laptop', 999.99, 10),
            ('Smartphone', 'Latest Smartphone', 599.99, 20),
            ('Headphones', 'Noise-cancelling Headphones', 199.99, 15)
            ON CONFLICT DO NOTHING;
        `);

        console.log('Füge Bestellungen ein...');
        await pool.query(`
            INSERT INTO orders (user_id, total_amount, order_date) VALUES
            ((SELECT id FROM users WHERE username = 'user1'), 1599.98, NOW()),
            ((SELECT id FROM users WHERE username = 'user2'), 199.99, NOW())
            ON CONFLICT DO NOTHING;
        `);

        console.log('Füge Bestellpositionen ein...');
        await pool.query(`
            INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
            ((SELECT id FROM orders WHERE total_amount = 1599.98), (SELECT id FROM products WHERE name = 'Laptop'), 1, 999.99),
            ((SELECT id FROM orders WHERE total_amount = 1599.98), (SELECT id FROM products WHERE name = 'Smartphone'), 1, 599.99),
            ((SELECT id FROM orders WHERE total_amount = 199.99), (SELECT id FROM products WHERE name = 'Headphones'), 1, 199.99)
            ON CONFLICT DO NOTHING;
        `);

        await pool.query('COMMIT');
        console.log('Transaktion abgeschlossen - Datenbank erfolgreich befüllt');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Fehler beim Seeding:', error.message);
        throw error;
    }
}

(async () => {
    try {
        await waitForPostgres();
        await waitForAllBackends();
        await seedDatabase();
        console.log('Seeding erfolgreich abgeschlossen');
    } catch (error) {
        console.error('Seeding fehlgeschlagen:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('Datenbankverbindung geschlossen');
    }
})();