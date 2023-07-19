const {
    Product,
    productAddSchema,
    updatePriceSchema,
} = require("../../models/product");

const { createError } = require("../../helpers");

const getAll = async (req, res, next) => {
    const { id: owner } = req.user;

    const result = await Product.find(
        { owner },
        "-createdAt -updatedAt"
    ).populate("owner");
    res.json(result);
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.findById(id);
        if (!result) {
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    try {
        const { error } = productAddSchema.validate(req.body);

        if (error) {
            throw createError(400, error.message);
        }

        const { id: owner } = req.user;
        const results = await Product.create({ ...req.body, owner });

        res.status(201).json(results);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { error } = productAddSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const { id } = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!result) {
            throw createError(400);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updatePrice = async (req, res, next) => {
    try {
        const { error } = updatePriceSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const { id } = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!result) {
            throw createError(400);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const removeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndRemove(id);
        if (!result) {
            throw createError(404);
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    addProduct,
    updateById,
    updatePrice,
    removeById,
};
