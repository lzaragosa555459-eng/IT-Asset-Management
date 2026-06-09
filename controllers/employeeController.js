const db = require("../config/database"); 

exports.index = (req, res) => {
    res.render("employee", {
        title: "Employees",  
        layout: "layouts/main"
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