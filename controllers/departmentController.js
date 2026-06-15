const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

exports.index = (req, res) => {

    db.all(`
        SELECT
            d.id,
            d.name,

            COUNT(DISTINCT e.id) AS employee_count,

            COUNT(DISTINCT a.id) AS assigned_assets,

            COUNT(DISTINCT r.id) AS request_count

        FROM departments d

        LEFT JOIN employees e
            ON e.department_id = d.id

        LEFT JOIN assignments a
            ON a.employee_id = e.id

        LEFT JOIN requests r
            ON r.employee_id = e.id

        GROUP BY d.id, d.name
        ORDER BY d.name
    `, [], (err, departments) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        res.render("departments", {
            title: "Departments",
            layout: "layouts/main",
            departments
        });

    });

};