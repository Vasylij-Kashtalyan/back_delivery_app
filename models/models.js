const fs = require("fs/promises");
const path = require("path");
const pathProduct = path.join(__dirname, "../db/products.json");

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

module.exports = { getAll, getById };
