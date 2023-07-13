const { Schema, model } = require("mongoose");

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

module.exports = Product;
