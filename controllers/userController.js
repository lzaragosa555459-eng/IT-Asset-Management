const db = require("../config/database");

exports.index = (req, res) => {

    const sql = `
        SELECT
            users.*,
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
    `;

    db.all(sql, [], (err, users) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("users", {
            title: "Users",
            layout: "layouts/main",
            users
        });
    });
};

exports.create = (req, res) => {

    db.all(
        `SELECT id, employee_id, name FROM employees`,
        [],
        (err, employees) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("users/add", {
                title: "Add User",
                layout: "layouts/main",
                employees
            });
        }
    );
};

exports.store = (req, res) => {

    const {
        username,
        password,
        role,
        employee_id
    } = req.body;

    db.run(
        `
        INSERT INTO users
        (username, password, role, employee_id)
        VALUES (?, ?, ?, ?)
        `,
        [
            username,
            password,
            role,
            employee_id || null
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/users");
        }
    );
};

exports.edit = (req, res) => {

    db.get(
        `SELECT * FROM users WHERE id = ?`,
        [req.params.id],
        (err, user) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            db.all(
                `SELECT id, employee_id, name FROM employees`,
                [],
                (err, employees) => {

                    if (err) {
                        console.log(err);
                        return res.send("Database Error");
                    }

                    res.render("users/edit", {
                        title: "Edit User",
                        layout: "layouts/main",
                        user,
                        employees
                    });
                }
            );
        }
    );
};

exports.update = (req, res) => {

    const {
        username,
        role,
        employee_id
    } = req.body;

    db.run(
        `
        UPDATE users
        SET
            username = ?,
            role = ?,
            employee_id = ?
        WHERE id = ?
        `,
        [
            username,
            role,
            employee_id || null,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/users");
        }
    );
};

exports.destroy = (req, res) => {

    db.run(
        `DELETE FROM users WHERE id = ?`,
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/users");
        }
    );
};