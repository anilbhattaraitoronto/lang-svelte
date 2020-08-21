const jwt = require("jsonwebtoken");
const DB = require("../db");
const { authSecret } = require("../secrets");

exports.verifyAdmin = (req, res, next) => {
  //get auth token

  const token = req.headers["x-access-token"];
  if (token) {
    //verify
    jwt.verify(token, authSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json(
          { message: "Token is expired or invalid." },
        );
      } else {
        const { status } = decoded;
        if (parseInt(status) === 1) {
          next();
        } else {
          return res.status(403).json({ message: "You are not authorized." });
        }
      }
    });
  } else {
    return res.status(401).json(
      { message: "Token is required but not provided." },
    );
  }
};
