const path = require("path");

exports.index = (req, res) => {
    res.render("dashboard", {
        title: "Dashboard",
        layout: "layouts/main"
    });
};