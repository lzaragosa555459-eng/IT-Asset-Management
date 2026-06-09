const path = require("path");

exports.index = (req, res) => {
    res.render("asset", {
        title: "Asset",
        layout: "layouts/main"
    });
};