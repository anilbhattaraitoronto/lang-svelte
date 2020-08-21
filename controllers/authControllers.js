const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const DB = require("../db.js");
const { emailConfig, emailSecret, authSecret } = require("../secrets");
const { sendActivationLink, sendPasswordResetEmail } = require(
  "../middlewares/sendMail",
);

exports.signup = (req, res) => {
  const { email, password } = req.body;
  sendActivationLink(emailConfig, emailSecret, email, password);
  return res.status(200).json(
    {
      success: true,
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

exports.login = (req, res) => {
  //get email and password
  const { email, password } = req.body;
  if (email && password) {
    //find if user with that email exists

    const getUserStmt = DB.prepare(`SELECT * FROm users WHERE email=?;`);
    const user = getUserStmt.get(email);
    if (user) {
      //compare the password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Invalid password." });
        } else if (result !== true) {
          return res.status(401).json({ message: "Invalid password." });
        } else {
          //generate token
          const accessToken = jwt.sign(
            {
              email: user.email,
              id: user.id,
              status: user.is_admin,
            },
            authSecret,
            {
              expiresIn: 10800,
            },
          );
          return res.status(200).json({
            email: user.email,
            status: user.is_admin,
            accessToken: accessToken,
          });
        }
      });
    } else {
      return res.status(404).json(
        {
          message:
            "User with that email does not exist. Maybe you have not registered, yet.",
        },
      );
    }
  } else {
    return res.status(400).json(
      { message: "Both email and password are required." },
    );
  }
};

exports.changePassword = (req, res) => {
  //get token from header
  const token = req.headers["x-access-token"];
  const { password, confirmPassword } = req.body;
  if (token) {
    jwt.verify(token, authSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json(
          { message: "The token is either invalid or expired." },
        );
      } else if (password === confirmPassword) {
        const { id } = decoded;
        const getUserStmt = DB.prepare(`SELECT * FROM users WHERE id = ?;`);
        const user = getUserStmt.get(id);
        if (user) {
          const hashedPassword = bcrypt.hashSync(password, salt);
          const updateUserStmt = DB.prepare(
            `UPDATE users SET password = ? WHERE id =?;`,
          );
          updateUserStmt.run(hashedPassword, id);
          return res.status(200).json(
            {
              status: 200,
              message:
                "Password is reset successfully. Please log in now with new password.",
            },
          );
        } else {
          return res.status(404).json({ message: "User does not exist." });
        }
      } else {
        return res.status(400).json({ message: "Passwords need to match." });
      }
    });
  } else {
    return res.status(400).json(
      { message: "Token is required but not provided." },
    );
  }
};

exports.requestPasswordResetLink = (req, res) => {
  const { email } = req.body;
  const getUserStmt = DB.prepare(`SELECT * FROM users WHERE email=?;`);
  const user = getUserStmt.get(email);
  if (user) {
    sendPasswordResetEmail(emailConfig, email, emailSecret);
    return res.status(200).json(
      {
        status: 200,
        success: "We have sent you an email with a link to reset password.",
      },
    );
  } else {
    return res.status(404).json({ message: "User does not exist." });
  }
};

exports.sendPasswordResetForm = (req, res) => {
  const { token } = req.params;
  if (token) {
    //verify token
    jwt.verify(token, emailSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json(
          { message: "Token is either expired or invalid." },
        );
      } else {
        const { email } = decoded;
        const getUserStmt = DB.prepare(`SELECT * FROM users WHERE email=?;`);
        const user = getUserStmt.get(email);
        if (user) {
          //send form
          const passwordResetForm = `
            <style>
            
            form{
                width:100%;
                max-width:650px;
                margin: 40px auto;
                padding: 20px;
            }
            h2{
                text-align:center;
                padding: 20px 0;
            }
            input, label{
                display: block;
                width: 100%;
                padding: 4px;
                margin: 8px auto;
            }
            input[type="submit"]{
                cursor: pointer;
                font-size: 16px;
            }
            
            </style>
            <form action="http://localhost:4005/api/auth/resetpassword/${token}" method="POST">
            <h2>Reset Password</h2>
            <label for="password">New Password</label>
            <input name="password" id="password" type="password" required />
            <label for="confirmPassword"> Re-type New Password</label>
            <input name="confirmPassword" id="password" type="password" required />
            <input type="submit" value="Reset Password" />
            </form>
            
            `;
          //form input for password, confirmPassword, hidden input for token
          return res.status(200).send(passwordResetForm);
        } else {
          return res.status(404).json({ message: "User does not exist." });
        }
      }
    });
  } else {
    return res.status(400).json(
      { message: "Token is required but not provided." },
    );
  }
};

exports.resetPassword = (req, res) => {
  // token
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (token) {
    jwt.verify(token, emailSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json(
          { message: "Token is expired or invalid." },
        );
      } else {
        const { email } = decoded;
        const getUserStmt = DB.prepare(`SELECT id FROM users WHERE email=?;`);
        const user = getUserStmt.get(email);
        if (user) {
          if (password === confirmPassword) {
            const hashedPassword = bcrypt.hashSync(password, salt);
            const updateUserStmt = DB.prepare(
              `UPDATE users SET password =? WHERE id =?;`,
            );
            updateUserStmt.run(hashedPassword, user.id);
            return res.status(200).json(
              { message: "Your password is reset. Please proceed to login." },
            );
          } else {
            return res.status(400).json({ message: "Passwords do not match." });
          }
        } else {
          return res.status(404).json({ message: "User does not exist" });
        }
      }
    });
  } else {
    return res.status(403).json(
      { message: "Token is needed but not provided." },
    );
  }
  console.log("Password is reset.");
};

exports.deleteUser = (req, res) => {
  const token = req.headers["x-access-token"];
  if (token) {
    //verify
    jwt.verify(token, authSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json(
          { message: "Token is invalid or expired." },
        );
      } else {
        const { id } = decoded;
        const deleteUserStmt = DB.prepare(`DELETE FROM users WHERE id=?;`);
        deleteUserStmt.run(id);
        return res.status(200).json(
          {
            success: "You have removed your account. You can sign up again.",
          },
        );
      }
    });
  } else {
    return res.status(400).json(
      { message: "Token is required but not provided." },
    );
  }
};
