import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const response = await axios.post("API_URL/login", { email, password });
    setUser(response.data.user);
    localStorage.setItem("token", response.data.token);
  };

  const register = async (formData) => {
    await axios.post("API_URL/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, login, register, logout };
};

export { useAuth };
