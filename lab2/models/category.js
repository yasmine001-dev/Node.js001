import fs from "fs/promises";
import { ROOTDIR } from "../util/path.js";
import path from "path";

export default class Category {
  constructor(name) {
    this.name = name;
  }

  static async getAllCategories() {
    const filePath = path.join(ROOTDIR, "data", "categories.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  static async createCategory(newCategory) {
    const filePath = path.join(ROOTDIR, "data", "categories.json");
    const data = await fs.readFile(filePath, "utf-8");
    const categories = JSON.parse(data);

    newCategory.id = categories.length
      ? categories[categories.length - 1].id + 1
      : 1;
    categories.push(newCategory);

    await fs.writeFile(filePath, JSON.stringify(categories, null, 2));
    return newCategory.id;
  }
}
