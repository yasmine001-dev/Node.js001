import Product from "../models/product.js";
import HTTPError from "../util/httpError.js";
// admin
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "-_id");
    return res.status(200).json({
      status: "success",
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
};
// admin
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate(
      "category",
      "-_id name",
    );
    if (!product) {
      return next(new HTTPError(404, "product not found"));
    }
    return res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePartOfProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findById(id);
    if (!product) return next(new HTTPError(404, "Product not found"));
    Object.assign(product, updates);
    const updatedProduct = await product.save();
    await updatedProduct.populate("category", "name -_id");
    return res.status(200).json({
      status: "success",
      message: "Product updated",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return next(new HTTPError(404, "Product not found"));
    }
    await product.deleteOne();
    return res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
};
export const replaceProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const replacedProduct = await Product.findOneAndReplace(
      { _id: id },
      req.body,
      { new: true, runValidators: true },
    ).populate("category", "name -_id");
    if (!replacedProduct) {
      return next(new HTTPError(404, "Product not found"));
    }
    return res.status(200).json({
      status: "success",
      message: "Product replaced",
      replacedProduct,
    });
  } catch (error) {
    next(error);
  }
};

//TESTME:allow update category by name or id
const updatePartOfProduct001 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id);
    if (!product) return next(new HTTPError(404, "Product not found"));
    if (
      updates.category &&
      !mongoose.Types.ObjectId.isValid(updates.category)
    ) {
      const category = await Category.findOne({
        name: { $regex: new RegExp(`^${updates.category}$`, "i") },
      });

      if (!category) {
        return next(
          new HTTPError(
            400,
            `Category '${updates.category}' does not exist. Please use a valid ID or an existing name.`,
          ),
        );
      }

      updates.category = category._id;
    }

    Object.assign(product, updates);
    const updatedProduct = await product.save();

    await updatedProduct.populate("category", "name -_id");

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
