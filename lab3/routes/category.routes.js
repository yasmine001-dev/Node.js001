import { Router } from "express";
import {
  getAllCategories,
  addCategory,
} from "../controllers/category.controller.js";
import {addCategoryValidator} from "../validations/categoryValidation.js";
import validationResult from "../validations/validateResults.js";
import { idParamValidator } from "../validations/validateMongoID.js";
const router = Router();

router.get("/", getAllCategories);
router.post(
  "/",
  addCategoryValidator,
  validationResult,
  addCategory,
);

export default router;
