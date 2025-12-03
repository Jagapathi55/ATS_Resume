import { Router } from "express";
import {
  createOrUpdateFeedback,
  getFeedback,
  getMyFeedback,
} from "../controllers/feedbackController.js";
import { validation } from "../middlewear.js";

const router = Router();

router.post("/", validation, createOrUpdateFeedback);

router.get("/", getFeedback);

router.get("/me", validation, getMyFeedback);

export default router;
