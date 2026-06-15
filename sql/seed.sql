-- Departments
INSERT INTO departments (name)
VALUES
('IT'),
('HR');

-- Categories
INSERT INTO categories (name)
VALUES
('Laptop'),
('Monitor');

-- Employees
INSERT INTO employees
(employee_id, name, department_id, position, email)
VALUES
('EMP001', 'John Doe', 1, 'Developer', 'john.doe@example.com'),
('EMP002', 'Jane Smith', 2, 'HR Manager', 'jane.smith@example.com');

-- Assets
INSERT INTO assets
(asset_tag, name, category_id, brand)
VALUES
('LAP001', 'Dell Latitude', 1, 'Dell'),
('MON001', 'Dell Monitor', 2, 'Dell');

-- Users
INSERT INTO users
(username, password, role, employee_id)
VALUES
('admin', '12345', 'Admin', NULL),
('john', '12345', 'Employee', 1),
('jane', '12345', 'Employee', 2);

-- Assignment
INSERT INTO assignments
(employee_id, asset_id, assigned_date)
VALUES
(1, 1, '2026-06-15');

-- Request
INSERT INTO requests
(employee_id, asset_id, request_date, reason, status)
VALUES
(2, 2, '2026-06-15', 'Need second monitor for work', 'Pending');

-- Maintenance
INSERT INTO maintenance
(asset_id, maintenance_date, description, cost)
VALUES
(1, '2026-06-15', 'Battery replacement', 1500);