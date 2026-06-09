const path = require("path");

exports.index = (req, res) => {
    res.sendFile("login.html", {
        root: "./views"
    });
};