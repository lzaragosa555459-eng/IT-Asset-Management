const path = require("path");

exports.index = (req, res) => {
    res.render("employee");
};

exports.store = (req, res) => {
    res.send("Employee Created");
};

exports.update = (req, res) => {
    res.send("Employee Updated");
};

exports.destroy = (req, res) => {
    res.send("Employee Deleted");
};