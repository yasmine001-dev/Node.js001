import {body} from "express-validator";

 export const addCategoryValidator=[

    body("name")
    .notEmpty()
    .trim()
    .isString()
    .toLowerCase()
    .isLength({ min: 2, max: 50 })
    .withMessage("express-validator:Name must be between 2 to 50 char")

 ];