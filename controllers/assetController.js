const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {

    db.all(`
        SELECT
            assets.*,
            categories.name AS category_name
        FROM assets
        LEFT JOIN categories
            ON assets.category_id = categories.id
    `, [], (err, assets) => {

        if (err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }

        res.render("asset", {
            title: "Assets",
            layout: "layouts/main",
            assets
        });

    });

};