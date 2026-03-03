import { Router } from "express";
// import handlers
import {
  getAllproducts,
  getproductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = Router();

router.get("/", getAllproducts);
router.post("/", createProduct);

router.get("/:id", getproductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
