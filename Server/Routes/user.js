const express = require("express");
const router = express.Router();

const { login, register } = require("../Controllers/user");
const {
  registerValidation,
  loginValidation,
} = require("../Middleware/validateUser");

router.route("/login").post(loginValidation, login);
router.route("/register").post(registerValidation, register);

module.exports = router;
