const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all("SELECT * FROM employees", [], (err, employees) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        db.all(
            `
            SELECT *
            FROM assets
            WHERE status = 'Available'
            `,
            [],
            (err, assets) => {

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

exports.store = (req, res) => {

    const {
        employee_id,
        asset_id
    } = req.body;

    db.run(
        `
        INSERT INTO assignments
        (
            employee_id,
            asset_id,
            assigned_date
        )
        VALUES (?, ?, DATE('now'))
        `,
        [
            employee_id,
            asset_id
        ],
        function(err) {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            db.run(
                `
                UPDATE assets
                SET status = 'Assigned'
                WHERE id = ?
                `,
                [asset_id],
                (err) => {

                    if (err) {
                        console.log(err);
                    }

                    res.redirect("/assignments");
                }
            );

        }
    );

};

exports.returnAsset = (req, res) => {

    db.get(
        `
        SELECT asset_id
        FROM assignments
        WHERE id = ?
        `,
        [req.params.id],
        (err, assignment) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            db.run(
                `
                UPDATE assignments
                SET returned_date = DATE('now')
                WHERE id = ?
                `,
                [req.params.id],
                (err) => {

                    if (err) {
                        console.log(err);
                        return res.send(err.message);
                    }

                    db.run(
                        `
                        UPDATE assets
                        SET status = 'Available'
                        WHERE id = ?
                        `,
                        [assignment.asset_id],
                        (err) => {

                            if (err) {
                                console.log(err);
                            }

                            res.redirect("/assignments");

                        }
                    );

                }
            );

        }
    );

};