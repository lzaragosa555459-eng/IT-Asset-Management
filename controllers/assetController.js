const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    const sql = "SELECT COUNT(*) AS total FROM assets";

    db.all(sql, [], (err, row) => {
        if(err){
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.render("asset", {
            title: "Asset",
            layout: "layouts/main",
            assetCount: row.total
        });
    });
};