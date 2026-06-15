const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

exports.index = (req, res) => {
    res.render("departments", {
        title: "Departments",
        layout: "layouts/main"
    });
};