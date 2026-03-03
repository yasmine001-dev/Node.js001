

import express from 'express';
import productController from "./controllers/products.js";
import userController from "./controllers/users.js";
import categoryController from "./controllers/categories.js";
const app = express();
app.use(express.json());
//  (Routing)
app.use('/api/products', productController);
app.use('/api/users', userController);
app.use('/api/categories', categoryController);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
export default app;