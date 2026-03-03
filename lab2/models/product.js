import fs from "fs/promises";
import { ROOTDIR } from "../util/path.js";
import path from "path";
export default class Product {
  constructor(name, price, categoryId) {
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
  }

  static async getAllproducts() {
    const filePath = path.join(ROOTDIR, "data", "products.json");
    let data = await fs.readFile(filePath, "utf-8");
    let parsed = JSON.parse(data);
    let products = Array.isArray(parsed) ? parsed : parsed.products;
    return products;
  }
  static async getproductById(productId) {
    const filePath = path.join(ROOTDIR, "data", "products.json");
    // read from file
    let data = await fs.readFile(filePath, "utf-8");
    let parsed = JSON.parse(data);
    let products = Array.isArray(parsed) ? parsed : parsed.products;
    let product = products.find((p) => p.id == productId);
    return product;
  }
  static async createProduct(newProduct) {
    const filePath = path.join(ROOTDIR, "data", "products.json");
    // read from file
    let data = await fs.readFile(filePath, "utf-8");
    let parsed = JSON.parse(data);
    let products = Array.isArray(parsed) ? parsed : parsed.products;
    newProduct.id = products[products.length - 1].id + 1;
    products.push(newProduct);
    // write on file
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct.id;
  }
  static async updateProduct(updatedProduct) {
    const filePath = path.join(ROOTDIR, "data", "products.json");
    let data = await fs.readFile(filePath, "utf-8");

    let parsed = JSON.parse(data);
    let products = Array.isArray(parsed) ? parsed : parsed.products;
    const index = products.findIndex((p) => p.id == updatedProduct.id);

    if (index !== -1) {
      products[index] = updatedProduct;
    }
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return updatedProduct;
  }
  static async deleteProduct(deletedProduct) {
    const filePath = path.join(ROOTDIR, "data", "products.json");
    let data = await fs.readFile(filePath, "utf-8");
    let parsed = JSON.parse(data);
    let products = Array.isArray(parsed) ? parsed : parsed.products;
    const index = products.findIndex((p) => p.id == deletedProduct.id);
    if (index !== -1) {
      products.splice(index, 1);
    }
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
  }
}
// const ali = new User();
// ali.getAllUsers();

// User.getUserById();
