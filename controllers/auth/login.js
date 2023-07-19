const { User, loginSchema } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    res.json({ token });
};

module.exports = login;
