import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { validation } from "../middlewear.js";

const router = express.Router();

router.post("/create", validation, createResume);
router.get("/my-resumes", validation, getUserResumes);
router.get("/:id", validation, getResumeById);
router.put("/:id", validation, updateResume);
router.delete("/:id", validation, deleteResume);

export default router;
