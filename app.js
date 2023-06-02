const app = require("express").express(); // екземпляр express програми.

const cors = require("cors"); // cors - для запитів з ішого браузера
const productRouter = require("./routes/api/products");

app.use(cors()); // для запитів з ішого браузера
app.use(express.json()); // Парсер JSON щоб інтерпретувати значення req.body як об'єкт замість рядка

app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Page not find!",
  });
});

app.listen(3000, () => console.log("Server running"));
