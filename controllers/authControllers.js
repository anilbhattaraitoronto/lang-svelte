const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const DB = require("../db.js");
const { emailConfig, emailSecret, authSecret } = require("../secrets");
const { sendActivationLink } = require("../middlewares/sendMail");

exports.signup = (req, res) => {
  const { email, password } = req.body;
  sendActivationLink(emailConfig, emailSecret, email, password);
  return res.status(200).json(
    {
      message:
        "We have sent you a link to activate your account. Please check your email.",
    },
  );
};

exports.activate = (req, res) => {
  //get token from params

  const { token } = req.params;
  if (token) {
    //verify token
    jwt.verify(token, emailSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json(
          { message: "Token is invalid or expired." },
        );
      } else {
        //get email and password from token
        const { email, password } = decoded;
        const hashedPassword = bcrypt.hashSync(password, salt);
        const createUserStmt = DB.prepare(
          `INSERT INTO users (email, password) VALUES (?,?);`,
        );
        createUserStmt.run(email, hashedPassword);
        return res.status(200).json(
          { message: "Your account is activated. Please proceed to login." },
        );
      }
    });
  } else {
    return res.status(403).json(
      { message: "Token is required but not provided." },
    );
  }
};
