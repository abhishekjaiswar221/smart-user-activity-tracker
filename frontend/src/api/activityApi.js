import http from "./axios";

const token = localStorage.getItem("token");

export const fetchStats = async () => {
  const response = await http.get("/activity/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const getSuspiciousActivity = async () => {
  const response = await http.get("/activity/suspicious", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const replayCheck = async (formData) => {
  const response = await http.post("/activity/replay-check", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const logActivity = async (formData) => {
  const response = await http.post("/activity", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};
