import express from "express";
import morgan from "morgan";
/// import for middlwares
import authenticationMW from "./middlewares/authenticationMW.js";
import notFoundMW from "./middlewares/notFoundMW.js";
/// import for routers
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";

const app = express();

// attach middlewares
app.use(morgan("dev"));
app.use(express.json());  // req.body
app.use(authenticationMW);

// define Routes (Endpoints)
// router mounting
app.use("/api/users",userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

// not found middleware
app.use("/", notFoundMW);

// global error handling

export default app;
