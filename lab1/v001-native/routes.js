const productController = require("./controller/products.js"); // :fix001
const userController = require("./controller/users.js"); // :fix001
const categoryController = require("./controller/categories.js"); // :fix001

const routes = (req, res) => {
  if (req.url === "/products" || req.url.startsWith("/products/")) { // :fix001
    console.log("products");
    return productController(req, res);
  } else if (req.url === "/categories" || req.url.startsWith("/categories/")) {
    console.log("categories");
    return categoryController(req, res); // :fix001
  } else if (req.url === "/users" || req.url.startsWith("/users/")) {
    console.log("users");
    return userController(req, res); // :fix001
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end();
  }
};
module.exports = routes;
