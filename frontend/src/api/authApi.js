import http from "./axios";

export const registerUser = async (formData) => {
  const response = await http.post("/auth/register", formData);
  return response?.data;
};

export const loginUser = async (formData) => {
  const response = await http.post("/auth/login", formData);
  return response?.data;
};

export const logoutUser = async () => {
  const response = await http.post("/auth/logout", {});
  return response?.data;
};
