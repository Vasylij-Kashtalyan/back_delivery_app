const express = require("express"); // екземпляр express програми.
const logger = require("morgan");
const cors = require("cors"); // cors - для запитів з ішого браузера
const path = require("path");
const multer = require("multer"); // multer - для зберігання файлів з фронтенда

const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routes/api/auth");
const productRouter = require("./routes/api/products");

const app = express();

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerConfig,
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors()); // для запитів з ішого браузера
app.use(express.json()); // Парсер JSON щоб інтерпретувати значення req.body як об'єкт замість рядка

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.post("/api/products/add", upload.single("cover"), (req, res) => {});

app.use((req, res) => {
    res.status(404).json({
        message: "Page not find!",
    });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

module.exports = app;
