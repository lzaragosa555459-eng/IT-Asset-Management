const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// routes
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

// 1. middleware (BODY PARSER)
app.use(express.urlencoded({ extended: true }));


// 2. view engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);


// 3. static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// 4. routes
app.use("/", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/assets", assetRoutes);
app.use("/assignments", assignmentRoutes);

// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});