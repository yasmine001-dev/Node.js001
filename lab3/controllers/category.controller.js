import Category from "../models/category.js";
import HTTPError from "../util/httpError.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // if (!name) {
    //   return next(new HTTPError(400, "Category name is required"));
    // }

    const newCategory = await Category.create({ name });

    res.status(201).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};
