const fs = require("fs/promises");
const path = require("path");
const pathProduct = path.join(__dirname, "./db/products.json");

async function getAll() {
  const data = await fs.readFile(pathProduct);
  return JSON.parse(data);
}

module.exports = { getAll };
