import "./chatHistory.css";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../context/StoreContext";

export default function ChatHistory({ onSelectChat, currentChatId, onNewChat }) {
  const {user, token, getChatSessions, deleteChatSession } = useContext(StoreContext);
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat sessions from backend
  const loadChatSessions = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await getChatSessions();
      console.log("Sessions response:", response); // Debug log
      if (response.success) {
        // Backend already returns sorted by updatedAt descending (newest first)
        // But let's ensure frontend also maintains the order
        setChatSessions(response.sessions || []);
      } else {
        console.error("Failed to load sessions:", response.message);
        setChatSessions([]);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
      setChatSessions([]);
    } finally {
      setLoading(false);
    }
  };

  // Load sessions on component mount and when user changes
  useEffect(() => {
    if (token && user) {
      loadChatSessions();
    } else {
      setChatSessions([]);
    }
  }, [token, user]);

  const createNewChat = () => {
    const newChatId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log("Creating new chat with ID:", newChatId);
    onNewChat(newChatId);
    
    // Refresh sessions to show the new chat at the top
    setTimeout(() => {
      loadChatSessions();
    }, 500);
  };

  const handleSelectChat = async (sessionId) => {
    console.log("Selecting chat:", sessionId);
    onSelectChat(sessionId);
  };

  const handleDeleteChat = async (sessionId, e) => {
    e.stopPropagation();
    
    try {
      const response = await deleteChatSession(sessionId);
      if (response.success) {
        setChatSessions(prev => prev.filter(session => session.sessionId !== sessionId));
        
        if (currentChatId === sessionId) {
          onNewChat(null);
        }
      } else {
        console.error("Failed to delete session:", response.message);
        alert("Failed to delete chat: " + response.message);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Error deleting chat");
    }
  };

  // Function to get display title
  const getDisplayTitle = (session) => {
    return session.title || "New Chat";
  };

  // Function to get formatted time
  const getFormattedTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return "Recent";
    }
  };

  // // Refresh sessions when current chat changes (new messages might update titles)
  // useEffect(() => {
  //   if (currentChatId) {
  //     // Small delay to ensure backend has saved the update
  //     setTimeout(() => {
  //       loadChatSessions();
  //     }, 300);
  //   }
  // }, [currentChatId]);

  if (!user) {
    return (
      <div className="chat-history">
        <div className="chat-history-header">
          <h3>Chat History</h3>
        </div>
        <div className="login-prompt">
          Please login to view your chat history
        </div>
      </div>
    );
  }

  return (
    <div className="chat-history">
      <div className="chat-history-header">
        <h3>Chat History</h3>
        <button className="new-chat-btn" onClick={createNewChat}>
          + New Chat
        </button>
      </div>
      
      <div className="chat-sessions">
        {loading ? (
          <div className="loading-chats">Loading chats...</div>
        ) : chatSessions.length === 0 ? (
          <div className="no-chats">No previous chats</div>
        ) : (
          chatSessions.map(session => {
            const displayTime = getFormattedTime(session.updatedAt);
            const displayTitle = getDisplayTitle(session);

            return (
              <div
                key={session.sessionId}
                className={`chat-session ${currentChatId === session.sessionId ? 'active' : ''}`}
                onClick={() => handleSelectChat(session.sessionId)}
              >
                <div className="chat-session-content">
                  <div className="chat-preview-title">
                    {displayTitle}
                  </div>
                  <div className="chat-preview-text">
                    {session.lastMessage?.content || session.lastMessage || "Start a new conversation"}
                  </div>
                  <div className="chat-meta">
                    <span className="message-count">{session.messageCount || 0} messages</span>
                    <span className="timestamp">{displayTime}</span>
                  </div>
                </div>
                <button 
                  className="delete-chat-btn"
                  onClick={(e) => handleDeleteChat(session.sessionId, e)}
                  title="Delete chat"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}