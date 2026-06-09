const express = require("express");
const app = express();

const path = require("path");

const employeeRoutes = require("./routes/employeeRoutes");
const loginRoutes = require("./routes/loginRoutes");

// 1. middleware FIRST
app.use(express.urlencoded({ extended: true }));

// 2. static files
app.use(express.static(path.join(__dirname, "public")));

// 3. routes
app.use("/", loginRoutes);
app.use("/employees", employeeRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});