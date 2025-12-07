import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FAST_MODEL = "llama-3.1-8b-instant";
const SMART_MODEL = "llama-3.3-70b-versatile";

console.log("Models Loaded:", FAST_MODEL, SMART_MODEL);

function cleanAIResponse(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/`/g, "")
    .trim();
}

export const generateSummary = async (req, res) => {
  try {
    const { about } = req.body;

    const prompt = `
Generate 4 different ATS-friendly professional summaries.
Each summary must be 3–4 lines.
Use ONLY this information:

${about}

Return ONLY a JSON array of 4 strings.
NO markdown.
NO backticks.
NO explanation.
ONLY pure JSON like:

[
  "Summary option 1...",
  "Summary option 2...",
  "Summary option 3...",
  "Summary option 4..."
]
`;

    const completion = await groq.chat.completions.create({
      model: FAST_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    let raw = completion.choices[0].message.content.trim();

    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/^\s*\[/, "[")
      .replace(/\]\s*$/, "]")
      .trim();

    let jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON array returned by AI");
    }

    let results = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(results) || results.length < 1) {
      throw new Error("AI returned invalid summary list");
    }

    return res.json({ summaries: results });
  } catch (err) {
    console.error("Summary Error:", err);
    return res.status(500).json({
      error: "AI returned invalid JSON",
    });
  }
};

export const generateProjectPoints = async (req, res) => {
  try {
    const { project } = req.body;

    const prompt = `
Write EXACTLY 3 bullet points (1 line each).
Do NOT include any bullet symbols like "-" or "•".
Return plain text lines only.

Use ONLY:
${JSON.stringify(project)}
`;

    const completion = await groq.chat.completions.create({
      model: FAST_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    let text = completion.choices[0].message.content.trim();

    let cleanPoints = text
      .split("\n")
      .map((line) =>
        line
          .replace(/^[-•●]/, "")
          .replace(/^\s*[-•●]/, "")
          .trim()
      )
      .filter((l) => l.length > 0);

    res.json({ points: cleanPoints });
  } catch (err) {
    console.error("Project Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const checkATSScore = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Compare resume vs job description.
Return STRICT JSON ONLY:

{
  "score": number,
  "missingSkills": [],
  "improvements": []
}

Do NOT include \`\`\`, markdown, or code blocks.

Resume:
${resumeText}

Job:
${jobDescription}
`;

    const completion = await groq.chat.completions.create({
      model: SMART_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    let raw = completion.choices[0].message.content.trim();
    let clean = cleanAIResponse(raw);

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.error("ATS JSON Parse Failed. Raw Output:", raw);
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: raw,
      });
    }

    return res.json(parsed);
  } catch (err) {
    console.error("ATS Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const tailorResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
You are an ATS-optimized Resume Tailoring Engine.

Rewrite and tailor the user's resume to match the job description.

When generating the SUMMARY:
- Use ONLY skills, projects, and experience
- Do NOT include education or certifications
- Keep it 3–4 lines max
- Make it achievement-focused and quantified where possible
- Highlight tools, technologies, and impact

Return ONLY valid JSON in this exact structure:

{
  "personalInfo": {},
  "summary": "A strong ATS-optimized 3–4 line summary created ONLY from skills, projects, and experience. Do not include personal info or education."

  "experience": [
    {
      "title": "",
      "company": "",
      "startDate": "",
      "endDate": "",
      "bullets": []
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "bullets": []
    }
  ],
  "skills": [],
  "education": [
    {
      "degree": "",
      "school": "",
      "year": ""
    }
  ],
  "achievements": [],
  "certifications": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const completion = await groq.chat.completions.create({
      model: SMART_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    let aiResponse = completion.choices[0].message.content.trim();

    let clean = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/`/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.error("Tailor JSON Parse Failed. Raw:", aiResponse);
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: aiResponse,
      });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Tailor Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
