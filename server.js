const express = require("express");
const app = express();

const path = require("path");

const employeeRoutes = require("./routes/employeeRoutes");
const loginRoutes = require("./routes/loginRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

// 1. middleware FIRST
app.use(express.urlencoded({ extended: true }));

// 2. static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// 3. routes
app.use("/", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/employees", employeeRoutes);
app.use("/assets", assetRoutes);
app.use("/assignments", assignmentRoutes);


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});