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
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
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
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
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

  // --- Chat with AI ---
  const sendChatMessage = async (message, sessionId = null) => {
    if (!token) {
      return { 
        success: false, 
        message: "Please login to chat with AI" 
      };
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/chat/chat`,
        { message, sessionId },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Chat failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to connect to AI service" 
      };
    } finally {
      setLoading(false);
    }
  };

  // --- CHAT HISTORY FUNCTIONS ---

  // Save chat message to history
  const saveChatHistory = async (sessionId, userMessage, aiResponse, title = null) => {
    if (!token) return { success: false, message: "Please login to save chat history" };

    try {
      const response = await axios.post(
        `${url}/api/history/save`,
        {
          sessionId,
          message: userMessage,
          response: aiResponse,
          title
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Save history failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to save chat history" 
      };
    }
  };

  // Get user's chat sessions
  const getChatSessions = async () => {
    if (!token) return { success: false, message: "Please login to get chat history" };

    try {
      const response = await axios.get(`${url}/api/history/sessions`, {
        headers: {
          'token': token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get sessions failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to load chat sessions" 
      };
    }
  };

  // Get specific chat session with messages
  const getChatSession = async (sessionId) => {
    if (!token) return { success: false, message: "Please login to get chat session" };

    try {
      const response = await axios.get(`${url}/api/history/session/${sessionId}`, {
        headers: {
          'token': token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get session failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to load chat session" 
      };
    }
  };

  // Update session title
  const updateSessionTitle = async (sessionId, title) => {
    if (!token) return { success: false, message: "Please login to update title" };

    try {
      const response = await axios.put(
        `${url}/api/history/session/${sessionId}/title`,
        { title },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update title failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to update title" 
      };
    }
  };

  // Delete chat session
  const deleteChatSession = async (sessionId) => {
    if (!token) return { success: false, message: "Please login to delete chat" };

    try {
      const response = await axios.delete(`${url}/api/history/session/${sessionId}`, {
        headers: {
          'token': token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Delete session failed:", error.response?.data || error.message);
      return error.response?.data || { 
        success: false, 
        message: "Failed to delete chat session" 
      };
    }
  };

  // --- Logout User ---
  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
  };

  // --- Load user session from localStorage on refresh ---
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("loggedInUser");
    
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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
    sendChatMessage,
    // Chat History Functions
    saveChatHistory,
    getChatSessions,
    getChatSession,
    updateSessionTitle,
    deleteChatSession,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;