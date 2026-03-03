import { Router } from "express";
// import handlers
import {
  getAllUsers,
  getuserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);

router.get("/:id", getuserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
