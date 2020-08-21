const { Router } = require("express");
const router = Router();
const {
  signup,
  activate,
  login,
  changePassword,
  requestPasswordResetLink,
  resetPassword,
  deleteUser,
  sendPasswordResetForm,
} = require(
  "../controllers/authControllers",
);
const { checkEmail } = require("../middlewares/checkEmail");

router.post("/signup", checkEmail, signup);
router.get("/activate/:token", activate);
router.post("/login", login);
router.post("/changepassword", changePassword);
router.post("/requestpasswordresetlink", requestPasswordResetLink);
router.get("/sendpasswordresetform/:token", sendPasswordResetForm);
router.post("/resetpassword/:token", resetPassword);
router.delete("/deleteuser", deleteUser);

module.exports = router;
