CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT NOT NULL,
    role TEXT,
    employee_id INTEGER,
    FOREIGN KEY(employee_id)
        REFERENCES employees(id)
); 

CREATE TABLE requests (
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
        REFERENCES assets(id)
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT UNIQUE,
    name TEXT NOT NULL,
    department_id INTEGER,
    position TEXT,
    email TEXT,
    FOREIGN KEY(department_id)
        REFERENCES departments(id)
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_tag TEXT UNIQUE,
    name TEXT NOT NULL,
    category_id INTEGER,
    brand TEXT,
    status TEXT DEFAULT 'Available',

    FOREIGN KEY(category_id)
        REFERENCES categories(id)
);

CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id INTEGER,
    maintenance_date DATE,
    description TEXT,
    cost REAL DEFAULT 0
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

