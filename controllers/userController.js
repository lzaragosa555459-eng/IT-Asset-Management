const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all(`
        SELECT
            users.id,
            users.username,
            users.role,
            employees.employee_id,
            employees.name,
            employees.position,
            employees.email,
            departments.name AS department_name
        FROM users
        LEFT JOIN employees
            ON users.employee_id = employees.id
        LEFT JOIN departments
            ON employees.department_id = departments.id
    `, [], (err, users) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        res.render("users", {
            title: "Users",
            layout: "layouts/main",
            users
        });

    });

};

exports.store = (req, res) => {
    res.send("User Created");
};

exports.update = (req, res) => {
    res.send("User Updated");
};

exports.destroy = (req, res) => {
    res.send("User Deleted");
};