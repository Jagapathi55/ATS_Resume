import express from "express";
import {
  generateSummary,
  generateProjectPoints,
  checkATSScore,
  tailorResume,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/summary", generateSummary);
router.post("/project-points", generateProjectPoints);
router.post("/ats-score", checkATSScore);
router.post("/tailor-resume", tailorResume);

export default router;
