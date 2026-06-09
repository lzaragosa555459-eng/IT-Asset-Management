const db = require("../config/database");

exports.index = (req, res) => {
    res.render("login");
};

//login logic for returning matching users
exports.login = (req, res) => {

    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, user) => {

            if (err) {
                return res.send(err.message);
            }

            if (!user) {
                return res.render("login", {
                    error: "User not found"
                });
            }

            if (user.password !== password) {
                return res.render("login", {
                    error: "Wrong password"
                });
            }

            // SUCCESS LOGIN
            return res.redirect("/dashboard");
        }
    );
};