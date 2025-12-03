import api from "./axios";

export const createResume = async (data) => {
  const res = await api.post("/resume/create", data);
  return res.data;
};

export const updateResume = async (id, data) => {
  const res = await api.put(`/resume/${id}`, data);
  return res.data;
};

export const getResumeById = async (id) => {
  const res = await api.get(`/resume/${id}`);
  return res.data;
};
