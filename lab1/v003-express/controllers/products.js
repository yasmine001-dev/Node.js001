import express from "express";
import { products } from "../data.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json(products);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  if (!product) return res.status(404).json({ message: "product not found" });
  res.json({ message: "product found", product });
});

// 2. (POST)
router.post("/", (req, res) => {
  const newId =
    products.length > 0 ? Number(products[products.length - 1].id) + 1 : 1;
  const newProduct = { id: newId, ...req.body }; // البيانات جاهزة في req.body
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });
});

// 3.   (PATCH)
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);
  if (index === -1)
    return res.status(404).json({ message: "product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json({
    message: "Product updated successfully",
    product: products[index],
  });
});

// 4.   (DELETE)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);
  if (index === -1)
    return res.status(404).json({ message: "product not found" });

  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: "product deleted", product: deletedProduct });
});

export default router;
