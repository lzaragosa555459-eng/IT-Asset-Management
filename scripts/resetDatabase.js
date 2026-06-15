const db = require("../config/database");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS assignments");
    db.run("DROP TABLE IF EXISTS maintenance");
    db.run("DROP TABLE IF EXISTS requests");
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS assets");
    db.run("DROP TABLE IF EXISTS employees");
    db.run("DROP TABLE IF EXISTS categories");
    db.run("DROP TABLE IF EXISTS departments");

    console.log("Database reset complete.");
});

db.close();