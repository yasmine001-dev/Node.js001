const data = require("../data.js");

const productController = (req, res) => {
  if (req.method === "GET") {
    // handle all products and product by ID
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
  if (!req.url.startsWith("/products/")) {
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }
  const id = req.url.split("/")[2];
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
      // 6. حدثي بيانات المنتج في الـ Array
      // (تلميح: ادمجي القديم مع الجديد عشان متفقديش الـ ID:
      // data.products[index] = { ...data.products[index], ...parsedBody })

      // 7. رجعي 200 OK ومعاها رسالة النجاح والمنتج بعد التعديل
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}
function replaceProduct(req, res) {
  if (!req.url.startsWith("/products/")) {
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }
  const id = req.url.split("/")[2];
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
    //      let newProduct = { id: newId, ...JSON.parse(body) };

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
  if (req.url === "/products") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(data.products));
  } else if (req.url.startsWith("/products/")) {
    const id = req.url.split("/")[2];

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
  if (!req.url.startsWith("/products/")) {
    // :fix001
    res.writeHead(404, { "content-type": "application/json" }); // :fix001
    return res.end(JSON.stringify({ message: "route not found" })); // :fix001
  }

  const id = req.url.split("/")[2]; // :fix001
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
