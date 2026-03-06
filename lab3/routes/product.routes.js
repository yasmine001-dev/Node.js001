import { Router } from "express";
// import handlers
import {
  getAllProducts,
  getProductById,
  updatePartOfProduct,
  deleteProduct,
  replaceProductById,
} from "../controllers/product.controller.js";

import {
  updatePartOfProductValidator,
  replaceProductByIdValidator,
} from "../validations/productValidators.js";
import validationResult from "../validations/validateResults.js";
import { idParamValidator } from "../validations/validateMongoID.js";
const router = Router();
router.get("/", getAllProducts);
router.get("/:id", idParamValidator, validationResult, getProductById);
router.patch(
  "/:id",
  idParamValidator,
  updatePartOfProductValidator,
  validationResult,
  updatePartOfProduct,
);
router.delete("/:id", idParamValidator, validationResult, deleteProduct);
router.put(
  "/:id",
  idParamValidator,
  replaceProductByIdValidator,
  validationResult,
  replaceProductById,
);
export default router;
