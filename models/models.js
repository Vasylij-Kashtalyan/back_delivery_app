const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const pathProduct = path.join(__dirname, "../db/products.json");

async function updateProducts(product) {
    await fs.writeFile(pathProduct, JSON.stringify(product, null, 2));
}

async function getAll() {
    const data = await fs.readFile(pathProduct);
    return JSON.parse(data);
}

async function getById(id) {
    const products = await getAll();
    const result = products.find((item) => item.id === id);

    if (!result) return null;

    return result;
}

async function addProduct({ name, description, price }) {
    const products = await getAll();
    const newProduct = {
        id: v4(),
        name,
        prod: [{ description, price, id: v4() }],
    };
    products.push(newProduct);
    await updateProducts(products);
    return newProduct;
}

async function updateById(id, { description, price }) {
    const products = await getAll();
    const idx = products.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    }
    products[idx] = { id, description, price };
    await updateProducts(products);
    return products[idx];
}

async function removeById(id) {
    const products = await getAll();
    const idx = products.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    }
    const [removeProduct] = products.splice(idx, 1);
    updateProducts(products);
    return removeProduct;
}

module.exports = { getAll, getById, addProduct, updateById, removeById };
