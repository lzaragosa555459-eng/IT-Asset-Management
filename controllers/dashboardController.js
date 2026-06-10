const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.get("SELECT COUNT(*) AS total FROM employees", [], (err, emp) => {
        db.get("SELECT COUNT(*) AS total FROM assets", [], (err, asset) => {
            db.get("SELECT COUNT(*) AS total FROM assignments", [],(err, assign) => {
                if(err){
                    console.error(err);
                    return res.status(500).send("DB Error");
                }
                res.render("dashboard", {
                    title: "Dashboard",
                    layout: "layouts/main",
                    employeeCount: emp.total,
                    assetCount: asset.total,
                    assignmentCount: assign.total
                });
            });

        });
    });
};