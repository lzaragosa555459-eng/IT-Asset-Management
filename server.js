const express = require("express");
const app = express();

const path = require("path");

const employeeRoutes = require("./routes/employeeRoutes");
const loginRoutes = require("./routes/loginRoutes");

// serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/employees", employeeRoutes);
app.use("/login", loginRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});