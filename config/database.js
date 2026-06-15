const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.serialize(() => {

    // Departments
    db.run(`
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Categories
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Employees
    db.run(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            name TEXT NOT NULL,
            department_id INTEGER,
            position TEXT,
            email TEXT,
            FOREIGN KEY(department_id)
                REFERENCES departments(id)
        )
    `);

    // Assets
    db.run(`
        CREATE TABLE IF NOT EXISTS assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_tag TEXT UNIQUE,
            name TEXT NOT NULL,
            category_id INTEGER,
            brand TEXT,
            status TEXT DEFAULT 'Available',
            FOREIGN KEY(category_id)
                REFERENCES categories(id)
        )
    `);

    // Users
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT NOT NULL,
            role TEXT,
            employee_id INTEGER,
            FOREIGN KEY(employee_id)
                REFERENCES employees(id)
        )
    `);

    // Requests
    db.run(`
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER,
            asset_id INTEGER,
            request_date DATE,
            reason TEXT,
            status TEXT DEFAULT 'Pending',
            approved_by INTEGER,
            approved_date DATE,
            FOREIGN KEY(employee_id)
                REFERENCES employees(id),
            FOREIGN KEY(asset_id)
                REFERENCES assets(id),
            FOREIGN KEY(approved_by)
                REFERENCES users(id)
        )
    `);

    // Maintenance
    db.run(`
        CREATE TABLE IF NOT EXISTS maintenance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id INTEGER,
            maintenance_date DATE,
            description TEXT,
            cost REAL DEFAULT 0,
            FOREIGN KEY(asset_id)
                REFERENCES assets(id)
        )
    `);

    // Assignments
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