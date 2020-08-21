const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.sendActivationLink = (
  senderDetail,
  secret,
  userEmail,
  userPassword,
) => {
  //create transporter

  const transporter = nodemailer.createTransport(senderDetail);

  const token = jwt.sign(
    {
      email: userEmail,
      password: userPassword,
    },
    secret,
    { expiresIn: "3m" },
  );
  const activationUrl = `http://localhost:4005/api/auth/activate/${token}`;
  const options = {
    from: "no-reply@email.com",
    to: userEmail,
    subject: `Account activation email`,
    html:
      `Please activate your account by clicking the link. <a href="${activationUrl}">${activationUrl} </a>`,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};

exports.sendPasswordResetEmail = (senderDetail, userEmail, secret) => {
  const transporter = nodemailer.createTransport(senderDetail);
  const token = jwt.sign({ email: userEmail }, secret, { expiresIn: "5m" });
  const passwordResetLink =
    `http://localhost:4005/api/auth/sendpasswordresetform/${token}`;
  const options = {
    from: "no-reply@email.com",
    to: userEmail,
    subject: "Go to reset your password",
    html:
      `<p> Please click the link to go to password reset form. <a href="${passwordResetLink}" >${passwordResetLink}</a>  </p>`,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};
