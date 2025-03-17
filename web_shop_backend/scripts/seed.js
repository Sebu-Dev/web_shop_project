const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function seedDatabase() {
    const client = await pool.connect();

    try {
        console.log('Starting database seeding...');
        await client.query('BEGIN');
        console.log('Transaction started');

        // Datenbank leeren
        try {
            await client.query('DELETE FROM order_items');
            console.log('Table order_items cleared');
            await client.query('DELETE FROM orders');
            console.log('Table orders cleared');
            await client.query('DELETE FROM products');
            console.log('Table products cleared');
            await client.query('DELETE FROM users');
            console.log('Table users cleared');
        } catch (err) {
            console.error('Error clearing tables:', err.message);
            throw err;
        }

        // Benutzer einfügen
        try {
            await client.query(`
                INSERT INTO users (username, password_hash, email, address, role) VALUES
                ('admin1', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'admin1@example.com', 'Admin Street 1', 'ADMIN'),
                ('user1', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'user1@example.com', 'User Street 1', 'USER'),
                ('user2', '$2a$10$Q8xB8eG8z5l5z5v5z5v5z5u5z5v5z5v5z5v5z5v5z5v5z5v5z5v5z', 'user2@example.com', 'User Street 2', 'USER');
            `);
            console.log('Users inserted successfully');
        } catch (err) {
            console.error('Error inserting users:', err.message);
            throw err;
        }

        // 20 Produkte einfügen
        try {
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
            console.log('20 Products inserted successfully');
        } catch (err) {
            console.error('Error inserting products:', err.message);
            throw err;
        }

        // Bestellungen einfügen
        try {
            await client.query(`
                INSERT INTO orders (user_id) VALUES
                ((SELECT id FROM users WHERE username = 'user1')),
                ((SELECT id FROM users WHERE username = 'user2'));
            `);
            console.log('Orders inserted successfully');
        } catch (err) {
            console.error('Error inserting orders:', err.message);
            throw err;
        }

        // Order Items einfügen
        try {
            await client.query(`
                INSERT INTO order_items (order_id, product_id, quantity) VALUES
                ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Laptop Pro'), 1),
                ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Wireless Headphones'), 2),
                ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1') LIMIT 1), (SELECT id FROM products WHERE name = 'Mouse Pad XL'), 1),
                ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user2') LIMIT 1), (SELECT id FROM products WHERE name = 'Smartphone X'), 1),
                ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user2') LIMIT 1), (SELECT id FROM products WHERE name = 'Bluetooth Earbuds'), 1);
            `);
            console.log('Order items inserted successfully');
        } catch (err) {
            console.error('Error inserting order items:', err.message);
            throw err;
        }

        await client.query('COMMIT');
        console.log('Transaction committed - Database seeded successfully');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Rolling back transaction due to error:', err.message);
    } finally {
        client.release();
        console.log('Database connection released');
    }
}

seedDatabase()
    .then(() => {
        console.log('Seeding process completed');
        pool.end();
        process.exit(0);
    })
    .catch(err => {
        console.error('Seeding process failed:', err.message);
        pool.end();
        process.exit(1);
    });