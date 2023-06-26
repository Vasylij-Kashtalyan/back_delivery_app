const express = require("express");
const Joi = require("joi");

const productsModel = require("../../models/models");
const { createError } = require("../../helpers");

const router = express.Router(); //Router() - для створення модульних,монтованих обробників маршрутів

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
    try {
        const result = await productsModel.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productsModel.getById(id);

        if (!result) {
            throw createError(404);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }

        const results = await productsModel.addProduct(req.body);
        res.status(201).json(results);
    } catch (error) {
        next(error);
    }
});

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   const data = dataProduc.filter((item) => item.id !== Number(id));
//   console.log(data);
//   res.json(data);
// });

module.exports = router;
