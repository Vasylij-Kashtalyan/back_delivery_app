const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

        products: [
            {
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
                totalPrice: {
                    type: Number,
                    required: true,
                },
                counter: {
                    type: Number,
                    required: true,
                },
                imageUrl: {
                    type: String,
                },
            },
        ],
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
