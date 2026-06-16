const db = require("../config/database");

exports.index = (req, res) => {

    const sql = `
        SELECT
            assets.*,
            categories.name AS category_name
        FROM assets
        LEFT JOIN categories
            ON assets.category_id = categories.id
    `;

    db.all(sql, [], (err, assets) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("asset", {
            title: "Assets",
            layout: "layouts/main",
            assets
        });

    });

};


exports.create = (req, res) => {

    db.all(
        `SELECT * FROM categories`,
        [],
        (err, categories) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("assets/add", {
                title: "Add Asset",
                layout: "layouts/main",
                categories
            });

        }
    );

};

exports.store = (req, res) => {

    const {
        asset_tag,
        name,
        category_id,
        brand,
        status
    } = req.body;

    db.run(
        `
        INSERT INTO assets
        (
            asset_tag,
            name,
            category_id,
            brand,
            status
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            asset_tag,
            name,
            category_id,
            brand,
            status
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/assets");

        }
    );

};

exports.edit = (req, res) => {

    db.get(
        `SELECT * FROM assets WHERE id = ?`,
        [req.params.id],
        (err, asset) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            db.all(
                `SELECT * FROM categories`,
                [],
                (err, categories) => {

                    if (err) {
                        console.log(err);
                        return res.send("Database Error");
                    }

                    res.render("assets/edit", {
                        title: "Edit Asset",
                        layout: "layouts/main",
                        asset,
                        categories
                    });

                }
            );

        }
    );

};

exports.update = (req, res) => {

    const {
        asset_tag,
        name,
        category_id,
        brand,
        status
    } = req.body;

    db.run(
        `
        UPDATE assets
        SET
            asset_tag = ?,
            name = ?,
            category_id = ?,
            brand = ?,
            status = ?
        WHERE id = ?
        `,
        [
            asset_tag,
            name,
            category_id,
            brand,
            status,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/assets");

        }
    );

};


exports.destroy = (req, res) => {

    db.run(
        `DELETE FROM assets WHERE id = ?`,
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.redirect("/assets");

        }
    );

};