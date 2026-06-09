const db = require("../config/database");

exports.index = (req, res) => {
    res.render("login", {
        title: "Login",
        layout: "layouts/auth"
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Username type:", typeof username);
    
    // First, let's check if we can query the database at all
    db.get("SELECT COUNT(*) as count FROM users", [], (err, result) => {
        if (err) {
            console.error("Error counting users:", err.message);
        } else {
            console.log("Total users in database:", result.count);
        }
    });
    
    // Now try to find the specific user
    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, user) => {
            console.log("Query callback triggered");
            console.log("Error:", err);
            console.log("User found:", user);
            
            if (err) {
                console.error("Database error details:", err.message);
                return res.render("login", {
                    title: "Login",
                    layout: "layouts/auth",
                    error: "Database error: " + err.message
                });
            }

            if (!user) {
                console.log("No user found with username:", username);
                
                // Let's see what users DO exist
                db.all("SELECT username FROM users", [], (err, users) => {
                    if (err) {
                        console.error("Error listing users:", err);
                    } else {
                        console.log("Existing usernames:", users.map(u => u.username));
                    }
                });
                
                return res.render("login", {
                    title: "Login",
                    layout: "layouts/auth",
                    error: "User not found"
                });
            }

            console.log("User found:", user);
            console.log("Stored password:", user.password, "Type:", typeof user.password);
            
            if (String(user.password) !== String(password)) {
                console.log("Password mismatch");
                return res.render("login", {
                    title: "Login",
                    layout: "layouts/auth",
                    error: "Wrong password"
                });
            }

            console.log("Login successful!");
            return res.redirect("/dashboard");
        }
    );
};