const data = require("../data.js");

const productController = (req, res) => {
  if (req.method === "GET") {
    return getProduct(req, res);
  } else if (req.method === "POST") {
    return createProduct(req, res); // :fix001
  } else if (req.method === "DELETE") {
    return deleteProduct(req, res); // :fix001
  } else if (req.method === "PUT") {
    return replaceProduct(req, res); // :fix001
  } else if (req.method === "PATCH") {
    return updateProduct(req, res); // :fix001
  }

  res.writeHead(405, { "content-type": "application/json" }); // :fix001
  return res.end(JSON.stringify({ message: "method not allowed" })); // :fix001
};
function updateProduct(req, res) {
  if (!req.url.startsWith("/api/products/")) { // :fix001 :fix002
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }
  const id = req.url.split("/")[3]; // :fix001 :fix002
  const index = data.products.findIndex((element) => element.id == id); // :fix001

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "product not found" })); // :fix001
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      data.products[index] = { ...data.products[index], ...JSON.parse(body) };
      res.writeHead(200, { "content-type": "application/json" }); // :fix001
      return res.end(
        JSON.stringify({
          message: "Product updated successfully",
          product: data.products[index],
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}
function replaceProduct(req, res) {
  if (!req.url.startsWith("/api/products/")) { // :fix001 :fix002
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }
  const id = req.url.split("/")[3]; // :fix001 :fix002
  const index = data.products.findIndex((element) => element.id == id); // :fix001

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "product not found" })); // :fix001
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      data.products[index] = {
        id: data.products[index].id,
        ...JSON.parse(body),
      };
      res.writeHead(200, { "content-type": "application/json" }); // :fix001
      return res.end(
        JSON.stringify({
          message: "Product updated successfully",
          product: data.products[index],
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}
function getProduct(req, res) {
  if (req.url === "/api/products") { // :fix002
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(data.products));
  } else if (req.url.startsWith("/api/products/")) { // :fix002
    const id = req.url.split("/")[3]; // :fix002

    const product = data.products.find((element) => element.id == id); // :fix001
    if (product) {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "product found", product }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "product not found" }));
    }
  }
  res.writeHead(404, { "content-type": "application/json" }); // :fix001
  return res.end(JSON.stringify({ message: "route not found" })); // :fix001
}

function createProduct(req, res) {
  // :fix001
  let body = ""; // :fix001
  // acts like event listener
  req.on("data", (chunk) => {
    // :fix001
    body += chunk.toString(); // :fix001
  });
  req.on("end", () => {
    // :fix001
    try {
      let newId = 1;
      if (data.products.length > 0) {
        const lastProduct = data.products[data.products.length - 1];
        newId = Number(lastProduct.id) + 1;
      }
      // :fix001
      let newProduct = { id: newId, ...JSON.parse(body) };

      data.products.push(newProduct); // :fix001

      res.writeHead(201, { "content-type": "application/json" }); // :fix001
      return res.end(
        JSON.stringify({
          message: "Product created successfully",
          product: newProduct,
        }),
      );
    } catch (error) {
      // :fix001
      res.writeHead(400, { "content-type": "application/json" }); // :fix001
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}

function deleteProduct(req, res) {
  // :fix001
  if (!req.url.startsWith("/api/products/")) { // :fix001 :fix002
    // :fix001
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }

  const id = req.url.split("/")[3]; // :fix001 :fix002
  const index = data.products.findIndex((element) => element.id == id); // :fix001

  if (index === -1) {
    // :fix001
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "product not found" })); // :fix001
  }

  const deletedProduct = data.products.splice(index, 1)[0]; // :fix001
  res.writeHead(200, { "content-type": "application/json" }); // :fix001
  return res.end(
    JSON.stringify({ message: "product deleted", product: deletedProduct }),
  ); // :fix001
}

module.exports = productController;
