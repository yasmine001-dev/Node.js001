import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: [3, " Product name must be more than 3 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    min: [0, "Price cannot be negative"],
     max: [100000, "Please enter a valid price"],
  },
  categoryId: {
    type: String,
    required: [true, "Category is required"]
  },
});
export default mongoose.model("Product", productSchema);
