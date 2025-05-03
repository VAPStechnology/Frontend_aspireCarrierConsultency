import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${API}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
  
      const userData = {
        id: data.data.id,
        isAdmin: data.data.isAdmin,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Logged in user:", userData); // Check if user data is correct
      toast.success("Logged in successfully");
      return true; // ✅ success
    } catch (error) {
      toast.error("Invalid Credentials. Please try again.");
      console.error(error);
      return false; // ❌ failure
    }
  };
  
  

  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.accessToken;
  
      if (!token) {
        throw new Error("No access token found");
      }
  
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Logout failed");
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
