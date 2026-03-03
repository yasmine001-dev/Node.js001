import Product from "../models/product.js";

export const getAllproducts = async (req, res) => {
  let products = await Product.getAllproducts();
  return res.status(200).json(products);
};

export const getproductById = async (req, res) => {
  let product = await Product.getproductById(req.params.id); // fix001
  return res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  let { name, price, categoryId } = req.body; // fix001

  const product = new Product(name, price, categoryId); // fix001
  product.id = await Product.createProduct(product); // fix001

  return res.status(201).json({
    message: "product created",
    product,
  });
};
export const updateProduct = async (req, res) => {
  let product = await Product.getproductById(req.params.id); // fix001
  // product = { ...product, ...req.body };
  Object.assign(product, req.body);
  await Product.updateProduct(product); // fix001
  return res.status(200).json({
    message: "product updated successfully",
    product,
  });
};
export const deleteProduct = async (req, res) => {
  let product = await Product.getproductById(req.params.id); // fix001
  await Product.deleteProduct(product); // fix001
  return res.status(200).json({
    message: "product deleted successfully",
  });
};
