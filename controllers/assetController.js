const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all("SELECT * FROM assets", [], (err, assets) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        res.render("asset", {
            title: "Assets",
            layout: "layouts/main",
            assets: assets
        });

    });

};