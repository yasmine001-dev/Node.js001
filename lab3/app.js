import express from "express";
import morgan from "morgan";

/// import  middlwares
import notFoundMW from "./middlewares/notFoundMW.js";
import errorHandlingMW from "./middlewares/errorHandlingMW.js";

/// import  routers
import ProductRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import authRouter from "./routes/auth.router.js";
const app = express();

// attach middlewares
app.use(morgan("dev"));
app.use(express.json()); // req.body

// app.use(authenticationMW);

// define Routes (Endpoints)
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/Products", ProductRouter);
app.use("/api/categories", CategoryRouter);

// not found middleware
app.use(notFoundMW);

// global error handling middleware
app.use(errorHandlingMW);

export default app;
