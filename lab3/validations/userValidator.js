import { body } from "express-validator";
//body cuz im validating body data

//createUser()
// const { name, email, password, role } = req.body;
export const createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(" express-validator:Name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("express-validator: name must be between 3 to 50 char"),
  body("email")
    .trim() //sanitize data by removing spaces
    .notEmpty()
    .withMessage("express-validator:Email is required")
    .isEmail() // validate email format
    .withMessage("express-validator:Not valid email")
    .normalizeEmail(), //Sanitizer :lowercase
  //هذه الدالة ذكية بما يكفي لتعرف قوانين الشركات الكبرى (مثل Gmail و Outlook):
  body("password")
    .isLength({ min: 6 })
    .withMessage("express-validator:Password should be at least 6 char"),
  body("role")
    .optional()
    .isString()
    .withMessage("express-validator:Role must be string"),
];
//updateUser()
//const { name, email } = req.body;
export const updateUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("express-validator:Name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("express-validator:name must be between 3 to 50 char"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("express-validator:Email is required")
    .isEmail()
    .withMessage("express-validator:Not valid email")
    .normalizeEmail(),
];
