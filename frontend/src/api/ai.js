import api from "./axios";

export const generateSummaryAPI = async (about) => {
  const res = await api.post("/api/ai/summary", { about });
  return res.data.summary;
};

export const generateProjectPointsAPI = async (projectObject) => {
  const res = await api.post("/api/ai/project-points", {
    project: projectObject,
  });
  return res.data.points;
};

export const checkATSScoreAPI = async (resumeText, jobDescription) => {
  const res = await api.post("/api/ai/ats-score", {
    resumeText,
    jobDescription,
  });
  return res.data;
};
