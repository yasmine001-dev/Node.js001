import { users } from "../data.js";
const userController = (req, res) => {
  if (req.method === "GET") {
    return getUser(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } else if (req.method === "PATCH") {
    return updateUser(req, res);
  }

  res.writeHead(405, { "content-type": "application/json" });
  return res.end(JSON.stringify({ message: "method not allowed" }));
};

function updateUser(req, res) {
  if (!req.url.startsWith("/api/users/")) {
    // :fix002
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }
  const id = req.url.split("/")[3]; // :fix002
  const index = users.findIndex((element) => element.id == id);

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
      const parsed = JSON.parse(body || "{}"); // :fix002
      if (typeof parsed.password !== "string") {
        // :fix002
        res.writeHead(400, { "content-type": "application/json" }); // :fix002
        return res.end(JSON.stringify({ message: "password is required" })); // :fix002
      }
      users[index].password = parsed.password; // :fix002
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "User password updated successfully", // :fix002
          user: users[index],
        }),
      );
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON data" }));
    }
  });
}

function getUser(req, res) {
  if (req.url === "/api/users") {
    // :fix002
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(users));
  } else if (req.url.startsWith("/api/users/")) {
    // :fix002
    const id = req.url.split("/")[3]; // :fix002

    const user = users.find((element) => element.id == id);
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
      if (users.length > 0) {
        const lastUser = users[users.length - 1];
        newId = Number(lastUser.id) + 1;
      }
      let newUser = { id: newId, ...JSON.parse(body) };

      users.push(newUser);

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
  if (!req.url.startsWith("/api/users/")) {
    // :fix002
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }

  const id = req.url.split("/")[3]; // :fix002
  const index = users.findIndex((element) => element.id == id);

  if (index === -1) {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "user not found" }));
  }

  const deletedUser = users.splice(index, 1)[0];
  res.writeHead(200, { "content-type": "application/json" });
  return res.end(
    JSON.stringify({ message: "user deleted", user: deletedUser }),
  );
}

// module.exports = userController;
export default userController;
