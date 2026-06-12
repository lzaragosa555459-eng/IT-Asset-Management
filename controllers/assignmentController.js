const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all("SELECT * FROM employees", [], (err, employees) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        db.all("SELECT * FROM assets", [], (err, assets) => {

            if (err) {
                console.error(err);
                return res.status(500).send("DB Error");
            }

            db.all(`
                SELECT
                    assignments.id,
                    employees.name AS employee_name,
                    assets.name AS asset_name,
                    assignments.assigned_date,
                    assignments.returned_date
                FROM assignments
                JOIN employees
                    ON assignments.employee_id = employees.id
                JOIN assets
                    ON assignments.asset_id = assets.id
            `, [], (err, assignments) => {

                if (err) {
                    console.error(err);
                    return res.status(500).send("DB Error");
                }

                res.render("assignment", {
                    title: "Assignments",
                    layout: "layouts/main",
                    employees,
                    assets,
                    assignments
                });

            });

        });

    });

};