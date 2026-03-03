import Category from "../models/category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.getAllCategories();
  return res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category(name);
  category.id = await Category.createCategory(category);

  return res.status(201).json({
    message: "category created",
    category,
  });
};
