import Product from "../models/product.js";
import HTTPError from "../util/httpError.js";

////  export const createProduct = async (req, res, next) => {};
// admin
//TODO: hide product password from return
export const getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    return res.status(200).json({
      count: product.length,
      product,
    });
  } catch (err) {
    next(err);
  }
};
// admin
//TODO: hide product password from return
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return next(new HTTPError(404, "product not found"));
    }
    return res.status(200).json(product);
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
     const updatedProduct =await product.save();
      return res.status(200).json({
      message: "Product",
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
          message: "Product deleted",
        });
      } catch (err) {
        next(err);
      }
};
export const replaceProductById = async (req, res, next) => {
     try {
    const { id } = req.params;
    const replacedProduct=await Product.findOneAndReplace({ _id: id }, req.body,{new: true,runValidators: true});
    if (!replacedProduct) {
      return next(new HTTPError(404, "Product not found"));
    }
      return res.status(200).json({
      message: "Product replaced",
      replacedProduct
    });
  } catch (error) {next(error);}
  
};
