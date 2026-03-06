import { body } from "express-validator";
import Category from "../models/category.js";
//updatePartOfProduct
//replaceProductById

//name,price,category
export const updatePartOfProductValidator = [
  body("name")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("express-validator:Name must be between 3 to 100 char")
    .escape(),
  body("price")
    .optional()
    .isFloat({ min: 0, max: 100000 })
    .withMessage("Please enter a valid price")
    .toFloat(),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) throw new Error("Category not found");
    }),
];
export const replaceProductByIdValidator = [
  body("name")
    .notEmpty()
    .trim()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("express-validator:Name must be between 3 to 100 char")
    .escape(),
  body("price")
    .notEmpty()
    .isFloat({ min: 0, max: 100000 })
    .withMessage("Please enter a valid price")
    .toFloat(),
  body("category")
    .notEmpty()
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) throw new Error("Category not found");
    }),
];
