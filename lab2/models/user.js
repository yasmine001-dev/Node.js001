import fs from "fs/promises";
import { ROOTDIR } from "../util/path.js";
import path from "path";

export default class User {
  constructor(name, email, password = "") {
    this.name = name;
    this.email = email;
    this.password = password;
    //id will be generated automaticlly by developer
  }

  static async getAllUsers() {
    // read from file
    let data = await fs.readFile(
      path.join(ROOTDIR, "data", "users.json"),
      "utf-8",
    );
    console.log(data);
    let { users } = JSON.parse(data);
    return users;
  }
  static async getUserById(id) {
    // read from file
    let data = await fs.readFile( path.join(ROOTDIR, "data", "users.json"),
      "utf-8",
    );
    let { users } = JSON.parse(data);
    let user = users.find((u) => u.id == id);
    return user;
  }
  static async createUser(user) {
    // read from file
    let data = await fs.readFile(
      path.join(ROOTDIR, "data", "users.json"),
      "utf-8",
    );
    console.log(data);
    let { users } = JSON.parse(data);
    user.id = users[users.length - 1].id + 1;
    users.push(user);
    // write on file
    await fs.writeFile(
      path.join(ROOTDIR, "data", "users.json"),
      JSON.stringify({ users }, null, 2),
    );
    return user.id;
  }
  static async updateUser(updatedUser){
// const data = await fs.readFile('users.json', 'utf-8'); =>Relative Path
const filePath = path.join(ROOTDIR, "data", "users.json");
let data = await fs.readFile(filePath, "utf-8");

//   let users = JSON.parse(data);// if users are arrays
    let {users} = JSON.parse(data);
  const index = users.findIndex(u => u.id == updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser; 
  }
await fs.writeFile(filePath, JSON.stringify({ users }, null, 2));
  return updatedUser;
  }
static async deleteUser(deletedUser) {
  const filePath = path.join(ROOTDIR, "data", "users.json");
  let data = await fs.readFile(filePath, "utf-8");
  let { users } = JSON.parse(data);
  const index = users.findIndex(u => u.id == deletedUser.id);
  if (index !== -1) {
    users.splice(index, 1); }
  await fs.writeFile(filePath, JSON.stringify({users}, null, 2));
}}
// const ali = new User();
// ali.getAllUsers();

// User.getUserById();