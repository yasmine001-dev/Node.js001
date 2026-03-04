import express from "express";
import morgan from "morgan";
/// import for middlwares

import notFoundMW from "./middlewares/notFoundMW.js";
import errorHandlingMW from "./middlewares/errorHandlingMW.js";
/// import for routers
import ProductRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import CategoryRouter from "./routes/category.routes.js"; 
const app = express();

// attach middlewares
app.use(morgan("dev"));
app.use(express.json()); // req.body
// app.use(authenticationMW);

// define Routes (Endpoints)
// router mounting
app.use("/api/users", userRouter);
app.use("/api/Products", ProductRouter);
app.use("/api/categories", CategoryRouter);

// not found middleware
app.use(notFoundMW);

app.use(errorHandlingMW);

export default app;
