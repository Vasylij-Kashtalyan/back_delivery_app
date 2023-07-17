const { User, loginSchema } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
    id: "64b3cab4dab0d119a9f7a901",
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
console.log(token);

const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(401, "Email wrong");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        throw createError(401, "Password wrong");
    }

    const token = "dsldls";
    res.json({ token });
};

module.exports = login;
