import express from "express";
import {
  changePassword,
  registerUser,
  updateProfile,
  userLogin,
} from "../controllers/userController.js";
import { validation } from "../middlewear.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.put("/update", validation, updateProfile);
router.put("/change-password", validation, changePassword);

export default router;
