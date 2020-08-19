const { Router } = require("express");
const router = Router();
const { signup, activate } = require("../controllers/authControllers");
const { checkEmail } = require("../middlewares/checkEmail");

router.post("/signup", checkEmail, signup);
router.get("/activate/:token", activate);
module.exports = router;
