import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Schema:Product name is required"],
      minlength: [3, "Schema:Product name must be more than 3 characters"],
      maxlength: [100, "Schema:Product name can't exceed 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Schema:Please enter product price"],
      min: [0, "Schema:Price cannot be negative"],
      max: [100000, "Schema:Please enter a valid price"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);
export default model("Product", productSchema);
