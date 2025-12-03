import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import Resume from "../models/resumeModel.js";
import { extractPDFText } from "../utils/pdfReader.js";

const readFileText = async (filePath, mimeType, originalName) => {
  const ext = path.extname(originalName).toLowerCase();

  if (ext === ".pdf" || mimeType === "application/pdf") {
    return await extractPDFText(filePath);
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  }

  if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  return "";
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const text = await readFileText(
      req.file.path,
      req.file.mimetype,
      req.file.originalname
    );

    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const resume = new Resume({
      userId,
      extractedText: text,
      personalInfo: {},
      isTailored: false,
      template: "minimal",
    });

    await resume.save();
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Uploaded Successfully",
      resumeId: resume._id,
      preview: text.slice(0, 250),
    });
  } catch (err) {
    console.error("UPLOAD ERROR >>>", err);
    res.status(500).json({ error: "PDF processing failed" });
  }
};
