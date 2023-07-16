const express = require("express");

const control = require("../../controllers/auth");

const { ctrlWraper } = require("../../helpers"); // обгортка try catch

const router = express.Router();

//singUp
router.post("/register", ctrlWraper(control.register));

//singIn
router.post("/login", ctrlWraper(control.login));

module.exports = router;
