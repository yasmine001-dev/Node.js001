import productController from "./controllers/products.js";
import userController from "./controllers/users.js";
import categoryController from "./controllers/categories.js";


const routes = (req, res) => {
  if (req.url === "/api/products" || req.url.startsWith("/api/products/")) { // :fix001 :fix002
    console.log("products");
    return productController(req, res);
  } else if (req.url === "/api/categories") { // :fix002
    console.log("categories");
    return categoryController(req, res); // :fix001
  } else if (req.url === "/api/users" || req.url.startsWith("/api/users/")) { // :fix002
    console.log("users");
    return userController(req, res); // :fix001
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end();
  }
};
export default routes;