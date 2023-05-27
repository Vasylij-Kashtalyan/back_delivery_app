const express = require("express");
const product = require("./date");
const dataProduc = require("./db/products.json");
const fs = require("fs/promises");
const moment = require("moment");
const cors = require("cors");

const app = express(); // app - веб сервер

app.use(cors());

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YY_hh:mm:ss");
//   await fs.appendFile("server.log", `\n${method},${url},${date}`);

//   next();
// });

app.get(`/products/`, (req, res) => {
  res.json(dataProduc);
});

app.listen(3000, () => console.log("Server running"));
