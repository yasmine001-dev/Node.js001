import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  let users = await User.getAllUsers();
  return res.status(200).json(users);
};

export const getuserById = async (req, res) => {
  let user = await User.getUserById(req.params.id);
  return res.status(200).json(user);
};

export const createUser = async (req, res) => {
  let { name, email, password } = req.body;

  const user = new User(name, email, password);
  user.id = await User.createUser(user);

  return res.status(201).json({
    message: "user created",
    user,
  });
};
export const updateUser = async (req, res) => {
  let user = await User.getUserById(req.params.id);
  // user = { ...user, ...req.body };
  Object.assign(user, req.body);
await User.updateUser(user);
  return res.status(200).json({
    message: "user updated successfully",
    user,
  });
};
export const deleteUser = async (req, res) => {
  let user = await User.getUserById(req.params.id);
  await User.deleteUser(user);
  return res.status(200).json({
    message: "user deleted successfully",
  });
};
