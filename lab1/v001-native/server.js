const http = require("http");
const routes = require("./routes.js");

const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000");
});
