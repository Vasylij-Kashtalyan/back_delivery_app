const express = require("express");

const control = require("../../controllers/products/index");

const { ctrlWraper } = require("../../helpers"); // обгортка try catch

const { auth } = require("../../middlewares");

const router = express.Router(); //Router() - для створення модульних,монтованих обробників маршрутів

router.get("/", ctrlWraper(control.getAll));

router.get("/:id", control.getById);

router.post("/", auth, control.addProduct);

router.put("/:id", control.updateById);

router.patch("/:id/price", control.updatePrice);

router.delete("/:id", control.removeById);

module.exports = router;
