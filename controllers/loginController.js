const path = require("path");
const db =
    require("../config/database");

exports.index = (req, res) => {
    res.sendFile("login.html", {
        root: "./views"
    });
};
//login logic for returning matching users
exports.login = (req, res) => {

    const { username, password } =
        req.body;

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, user) => {

            if (err) {
                return res.send(err.message);
            }

            if (!user) {
                return res.send(
                    "User not found"
                );
            }

            if (
                user.password !== password
            ) {
                return res.send(
                    "Wrong password"
                );
            }

            res.send(
                "Login Successful"
            );
        }
    );
};