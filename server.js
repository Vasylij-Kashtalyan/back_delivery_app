const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
    .connect(DB_HOST, console.log("date base"))
    .then(() =>
        app.listen(PORT, () => {
            console.log("Server running. Use our API on port: 3000");
        })
    )
    .catch((error) => {
        console.log(error);
        process.exit(1);
    }); // для підключення до бази.
