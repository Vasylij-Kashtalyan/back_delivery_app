const dataProduc = require("../../db/products.json");

const express = require("express");

const router = express.Router(); //Router() - для створення модульних,монтованих обробників маршрутів

router.get("/", (req, res) => {
  res.json(dataProduc);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const data = dataProduc.filter((item) => item.id === Number(id));
  console.log(data);
  res.json(data);
});

module.exports = router;
