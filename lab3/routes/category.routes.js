import { Router } from "express";
import {
  getAllCategories,
  addCategory,
} from "../controllers/category.controller.js";
import { validate } from "../validations/validate.js"
import { addCategorySchema } from "../validations/categorySchema.js"
const router = Router();

router.get("/", getAllCategories);
router.post(
  "/",
  validate(addCategorySchema),
  addCategory,
);



export default router;
