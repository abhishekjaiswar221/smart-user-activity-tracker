import http from "./axios";

export const fetchStats = async () => {
  const response = await http.get("/activity/stats");
  return response?.data;
};

export const getSuspiciousActivity = async () => {
  const response = await http.get("/activity/suspicious");
  return response?.data;
};

export const replayCheck = async (formData) => {
  const response = await http.post("/activity/replay-check", formData);
  return response?.data;
};

export const logActivity = async (formData) => {
  const response = await http.post("/activity", formData);
  return response?.data;
};
