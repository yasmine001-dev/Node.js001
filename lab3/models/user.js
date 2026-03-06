import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    // contains attributes of the user
    name: {
      type: String,
      minlength: [3, "Schema:Name must be more than 3 characters"],
      maxlength: [30, "Schema:Name can't be more than 30 character"],
      required: [true, "Schema:Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true, // run at database level
      required: [true, "Schema:Email is required"],
      lowercase: true, //stored in lowercase
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Schema:Email should be like example@gmail.com",
      ],
    },
    password: {
      type: String,
      minlength: [6, "Schema:Password should be at least 6 char"],
      required: [true, "Schema:Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default model("User", userSchema);
