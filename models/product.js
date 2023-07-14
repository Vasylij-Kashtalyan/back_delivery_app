const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: [
                {
                    id: {
                        type: String,
                        required: true,
                        unique: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    },
    { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const productAddSchema = Joi.object({
    name: Joi.string().required(),

    products: Joi.array()
        .valueOf({
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
        })
        .required(),
});

const updatePriceSchema = Joi.object({
    products: Joi.array()
        .valueOf({
            price: Joi.number().required(),
        })
        .required(),
});

module.exports = {
    Product,
    productAddSchema,
    updatePriceSchema,
};
