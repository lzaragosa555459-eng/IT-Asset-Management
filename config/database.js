const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            name TEXT NOT NULL,
            department TEXT,
            position TEXT,
            email TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_tag TEXT UNIQUE,
            name TEXT NOT NULL,
            category TEXT,
            brand TEXT,
            status TEXT DEFAULT 'Available'
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER,
            asset_id INTEGER,
            assigned_date DATE,
            returned_date DATE,
            FOREIGN KEY(employee_id)
                REFERENCES employees(id),
            FOREIGN KEY(asset_id)
                REFERENCES assets(id)
        )
    `);
});

module.exports = db;