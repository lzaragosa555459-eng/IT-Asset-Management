const path = require("path");

exports.index = (req, res) => {
    res.sendFile("employee.html", {
        root: "./views"
    });
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