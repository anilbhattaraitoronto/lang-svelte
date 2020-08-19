const DB = require("../db.js");

exports.checkEmail = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (email && password && confirmPassword) {
    //check if password and confirmPassword match
    if (password === confirmPassword) {
      //check if user with that email exists.
      const getUserStmt = DB.prepare(`SELECT email FROM users WHERE email=?;`);
      const user = getUserStmt.get(email);
      if (user) {
        return res.status(400).json(
          { message: "User with that email aready exists." },
        );
      } else {
        next();
      }
    } else {
      return res.status(400).json({ message: "Passwords did not match." });
    }
  } else {
    return res.status(400).json({ message: "All fields are required." });
  }
};
