CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT UNIQUE,
    name TEXT NOT NULL,
    department TEXT,
    position TEXT,
    email TEXT
);

CREATE TABLE assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_tag TEXT UNIQUE,
    name TEXT NOT NULL,
    category TEXT,
    brand TEXT,
    status TEXT DEFAULT 'Available'
);

CREATE TABLE assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER,
    asset_id INTEGER,
    assigned_date DATE,
    returned_date DATE,
    FOREIGN KEY(employee_id)
        REFERENCES employees(id),
    FOREIGN KEY(asset_id)
        REFERENCES assets(id)
);