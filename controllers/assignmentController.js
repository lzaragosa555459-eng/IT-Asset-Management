const path = require("path");

exports.index = (req, res) => {
    res.render("assignment", {
        title: "Assignment",
        layout: "layouts/main"
    });
};