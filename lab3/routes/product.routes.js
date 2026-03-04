import { Router } from "express";
// import handlers
import {
  getAllProducts,
    getProductById,
    updatePartOfProduct,
    deleteProduct,
    replaceProductById,

} from "../controllers/product.controller.js";
const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", updatePartOfProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", replaceProductById);
export default router;
