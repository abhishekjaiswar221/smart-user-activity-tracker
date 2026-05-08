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
