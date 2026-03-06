import { Schema, model } from "mongoose";
// One Category → Many Products
const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true, 
  minlength: [2, "Category name must be at least 2 characters"],
  maxlength: [50, "Category name can't exceed 50 characters"],
  lowercase: true //labtop === LAPTOP
  },
},
{ timestamps: true });
export default model("Category", categorySchema);
