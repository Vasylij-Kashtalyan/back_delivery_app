const { User, registerSchema } = require("../../models/user");
const { createError } = require("../../helpers");

const bcrypt = require("bcryptjs");

// const hashPassword = async (password) => {
// const salt = await bcrypt.genSalt(10);
//
// const result = await bcrypt.hash(password, salt);
// console.log(result);
//
// const compare = await bcrypt.compare("kelevra22", result);
// console.log(compare);
// };
// hashPassword("kelevra22");

const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw createError(409, `${email} is already exist`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        name: result.name,
        email: result.email,
    });
};

module.exports = register;
