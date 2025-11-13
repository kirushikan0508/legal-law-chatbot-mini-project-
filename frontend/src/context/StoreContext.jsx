import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Register User ---
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name,
        email,
        password,
      });
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Network error or server unavailable" 
      };
    } finally {
      setLoading(false);
    }
  };

  // --- Login User ---
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password,
      });
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Network error or server unavailable" 
      };
    } finally {
      setLoading(false);
    }
  };

  // --- Logout User ---
  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // --- Load user session from localStorage on refresh ---
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Optionally fetch user info using the token
    }
  }, []);

  const contextValue = {
    url,
    token,
    user,
    setUser,
    loading,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;