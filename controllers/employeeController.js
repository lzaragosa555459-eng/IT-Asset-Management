const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all("SELECT * FROM employees", [], (err, employees) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        res.render("employee", {
            title: "Employees",
            layout: "layouts/main",
            employees: employees
        });

    });

};

exports.store = (req, res) => {
    res.send("Employee Created");
};

exports.update = (req, res) => {
    res.send("Employee Updated");
};

exports.destroy = (req, res) => {
    res.send("Employee Deleted");
};