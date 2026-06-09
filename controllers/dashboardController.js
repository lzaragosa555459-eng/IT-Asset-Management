const path = require("path");

exports.index = (req, res) => {
    res.render("dashboard");
};

exports.getEmployees = (req, res) => {
    // logic here
    res.render("employees");
};