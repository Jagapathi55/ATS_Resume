import express from "express";
import { checkATSScore, tailorResume } from "../controllers/aiController.js";
import { validation } from "../middlewear.js";

const router = express.Router();

router.post("/check", validation, checkATSScore);

router.post("/tailor", validation, tailorResume);

export default router;
