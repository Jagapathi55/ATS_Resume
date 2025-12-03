import express from "express";
import multer from "multer";
import path from "path";
import { uploadResume } from "../controllers/uploadController.js";
import { validation } from "../middlewear.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Only pdf/docx/txt allowed"));
    }
    cb(null, true);
  },
});

router.post("/", validation, upload.single("resume"), uploadResume);

export default router;
