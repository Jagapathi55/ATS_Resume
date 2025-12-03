import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const generateSummary = async (req, res) => {
  try {
    const { about } = req.body;

    if (!about) return res.status(400).json({ error: "about text required" });

    const prompt = `
You are a senior resume writer.

Create a professional summary (3–4 short sentences, < 60 words)
using ONLY the user input.

USER DATA:
${about}

Rules:
- ATS-friendly
- Simple language
- No fake achievements
- No buzzwords
- Crisp and natural tone.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    res.json({ summary: text });
  } catch (err) {
    console.error("Gemini Summary Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const generateProjectPoints = async (req, res) => {
  try {
    const { project } = req.body;

    if (!project || !project.title)
      return res.status(400).json({ error: "project object required" });

    const prompt = `
Write EXACTLY 3 one-line bullet points for the project.

PROJECT:
Title: ${project.title}
Tech: ${project.tech}
Description: ${project.description}

Rules:
- Only use provided details
- No assumptions
- Strong action verbs
- One line per bullet
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    res.json({ points: text });
  } catch (err) {
    console.error("Gemini Project Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const checkATSScore = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription)
      return res.status(400).json({ error: "Resume & Job required" });

    const prompt = `
Compare RESUME vs JOB DESCRIPTION. 
Return STRICT JSON:

{
  "score": number,
  "missingSkills": [],
  "improvements": []
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    text = text.replace(/```json|```/g, "");

    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (err) {
    console.error("Gemini ATS Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const tailorResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription)
      return res.status(400).json({ error: "Resume & JD required" });

    const prompt = `
Rewrite this resume to match the job description.
Return STRICT JSON:

{
  "personalInfo": {},
  "summary": "",
  "experience": [],
  "projects": [],
  "skills": [],
  "education": [],
  "achievements": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();
    text = text.replace(/```json|```/g, "");

    const json = JSON.parse(text);

    res.json(json);
  } catch (err) {
    console.error("Tailor Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};
