const express = require("express");

const control = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers"); // обгортка try catch

const { auth } = require("../../middlewares");

const router = express.Router();

//singUp
router.post("/register", ctrlWrapper(control.register));

//singIn
router.post("/login", ctrlWrapper(control.login));

router.get("/current", auth, ctrlWrapper(control.getCurrent));

router.get("/logout", auth, ctrlWrapper(control.logout));

module.exports = router;
