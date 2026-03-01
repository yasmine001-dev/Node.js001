const data = require("../data.js"); // :fix001
// GET /api/categories – Get all categories
// POST /api/categories – Add new category

const categoryController = (req, res) => {
  if (req.method === "GET") {
    return getCategory(req, res);
  } else if (req.method === "POST") {
    return createCategory(req, res);
  }
  res.writeHead(405, { "content-type": "application/json" });
  return res.end(JSON.stringify({ message: "method not allowed" }));
};
function getCategory(req, res) {
  if (req.url === "/categories") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(data.users));
  }
  res.writeHead(404, { "content-type": "application/json" });
  return res.end(JSON.stringify({ message: "route not found" }));
}
function createCategory(req, res) {
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
        if (data.categories.length > 0) {
          const lastCategory = data.categories[data.categories.length - 1];
          newId = Number(lastCategory.id) + 1;
        }
        let newCategory = { id: newId, ...JSON.parse(body) };
  
        data.categories.push(newCategory); 
  
        res.writeHead(201, { "content-type": "application/json" }); 
        return res.end(
          JSON.stringify({
            message: "Category created successfully",
            category: newCategory,
          }),
        );
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" }); 
        return res.end(JSON.stringify({ message: "Invalid JSON data" }));
      }
    });
}
