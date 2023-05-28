const express = require("express"); // екземпляр express програми.
const product = require("./date");
const dataProduc = require("./db/products.json");
const fs = require("fs/promises"); // fs - пакет для роботи з файлами, читати, записувати
const moment = require("moment");
const cors = require("cors"); // cors - для запитів з ішого браузера
const productRouter = require("./routes/api/products");

const app = express(); // app - веб сервер

app.use(cors()); // для запитів з ішого браузера
app.use(express.json()); // Парсер JSON щоб інтерпретувати значення req.body як об'єкт замість рядка

app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Page not find!",
  });
});

app.listen(3000, () => console.log("Server running"));

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YY_hh:mm:ss");
//   await fs.appendFile("server.log", `\n${method},${url},${date}`);

//   next();
// });
