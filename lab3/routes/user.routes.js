import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  createUserValidator,
  updateUserValidator,
} from "../validations/userValidator.js";
import validationResult from "../validations/validateResults.js";
import { idParamValidator } from "../validations/validateMongoID.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/", createUserValidator, validationResult, createUser); // validate express-validator
router.get("/:id", idParamValidator, validationResult, getUserById); // validate //check id is mongoDB id
router.patch(
  "/:id",
  idParamValidator,
  updateUserValidator,
  validationResult,
  updateUser,
); // validate express-validator
router.delete("/:id", idParamValidator, validationResult, deleteUser); // validate express-validator

export default router;
