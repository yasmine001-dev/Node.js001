const data = require("../data.js");

const userController = (req, res) => {
  if (req.method === "GET") {
    return getUser(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } else if (req.method === "PUT") {
    return replaceUser(req, res);
  } else if (req.method === "PATCH") {
    return updateUser(req, res);
  }

  res.writeHead(405, { "content-type": "application/json" });
  return res.end(JSON.stringify({ message: "method not allowed" }));
}

function updateUser(req, res) {
  if (!req.url.startsWith("/users/")) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }
  const id = req.url.split("/")[2];
  const index = data.users.findIndex((element) => element.id == id);

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "user not found" }));
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      data.users[index] = { ...data.users[index], ...JSON.parse(body) }
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "User updated successfully",
          user: data.users[index],
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}

function replaceUser(req, res) {
  if (!req.url.startsWith("/users/")) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }
  const id = req.url.split("/")[2];
  const index = data.users.findIndex((element) => element.id == id);

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "user not found" }));
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      data.users[index] = { id: data.users[index].id, ...JSON.parse(body) };
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "User replaced successfully",
          user: data.users[index],
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}

function getUser(req, res) {
  if (req.url === "/users") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(data.users));
  } else if (req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];

    const user = data.users.find((element) => element.id == id);
    if (user) {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "user found", user }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "user not found" }));
    }
  }
  res.writeHead(404, { "content-type": "application/json" });
  return res.end(JSON.stringify({ message: "route not found" }));
}

function createUser(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      let newId = 1;
      if (data.users.length > 0) {
        const lastUser = data.users[data.users.length - 1];
        newId = Number(lastUser.id) + 1;
      }
      let newUser = { id: newId, ...JSON.parse(body) };

      data.users.push(newUser);

      res.writeHead(201, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "User created successfully",
          user: newUser,
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}

function deleteUser(req, res) {
  if (!req.url.startsWith("/users/")) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }

  const id = req.url.split("/")[2];
  const index = data.users.findIndex((element) => element.id == id);

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "user not found" }));
  }

  const deletedUser = data.users.splice(index, 1)[0];
  res.writeHead(200, { "content-type": "application/json" });
  return res.end(
    JSON.stringify({ message: "user deleted", user: deletedUser }),
  );
}

module.exports = userController;