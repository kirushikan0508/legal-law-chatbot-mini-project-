import { useEffect, useRef, useState, useContext } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "../ChatInput/ChatInput";
import ChatHistory from "./ChatHistory/ChatHistory";
import "./chatWindow.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { 
    sendChatMessage, 
    user, 
    token, 
    getChatSession, 
    saveChatHistory,
    getChatSessions
  } = useContext(StoreContext);

  // Load initial state
  useEffect(() => {
    if (token && user) {
      // Load the most recent session or create new one
      loadMostRecentSession();
    } else {
      setMessages([
        {
          id: "bot-welcome",
          sender: "bot",
          text: "Welcome to Legal Assistant AI — Please login to start chatting and save your conversation history.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [token, user]);

  // Auto-scroll to bottom on messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Load the most recent session
  const loadMostRecentSession = async () => {
    if (!token) return;

    try {
      const response = await getChatSessions();
      if (response.success && response.sessions && response.sessions.length > 0) {
        // Load the FIRST session (which is the most recent due to backend sorting)
        const mostRecent = response.sessions[0];
        await loadChatMessages(mostRecent.sessionId);
      } else {
        // No sessions found, create new one
        createNewChat();
      }
    } catch (error) {
      console.error("Error loading recent session:", error);
      createNewChat();
    }
  };

  const createNewChat = () => {
    const newChatId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log("Creating new chat in ChatWindow:", newChatId);
    setCurrentChatId(newChatId);
    setMessages([
      {
        id: "bot-welcome",
        sender: "bot",
        text: "Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const loadChatMessages = async (sessionId) => {
    if (!token) {
      console.log("No token, cannot load messages");
      return;
    }

    setLoading(true);
    try {
      const response = await getChatSession(sessionId);
      console.log("Load session response:", response);
      
      if (response.success && response.session) {
        // Convert backend messages to frontend format
        const formattedMessages = response.session.messages.map(msg => ({
          id: `msg-${msg.timestamp}-${Math.random().toString(36).substr(2, 9)}`,
          sender: msg.role === 'user' ? 'user' : 'bot',
          text: msg.content,
          timestamp: msg.timestamp
        }));
        
        // Add welcome message if empty
        if (formattedMessages.length === 0) {
          formattedMessages.push({
            id: "bot-welcome",
            sender: "bot",
            text: "Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
            timestamp: new Date().toISOString(),
          });
        }
        
        setMessages(formattedMessages);
        setCurrentChatId(sessionId);
        console.log("Loaded messages:", formattedMessages.length);
      } else {
        console.error("Failed to load session:", response.message);
        // If session doesn't exist, create new one
        createNewChat();
      }
    } catch (error) {
      console.error("Error loading session:", error);
      createNewChat();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (sessionId) => {
    console.log("Handling select chat:", sessionId);
    loadChatMessages(sessionId);
  };

  const appendMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleSend = async (query) => {
    if (!query.trim()) return;

    // Check if user is logged in
    if (!token || !user) {
      appendMessage({
        id: `bot-error-${Date.now()}`,
        sender: "bot",
        text: "Please login to chat with the AI assistant and save your conversation history.",
        timestamp: new Date().toISOString(),
        error: true,
      });
      return;
    }

    // If no current chat, create one
    if (!currentChatId) {
      createNewChat();
      // Wait a bit for state to update
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toISOString(),
    };
    appendMessage(userMsg);

    // Add "typing" bubble
    const typingId = `bot-typing-${Date.now()}`;
    const typingMsg = {
      id: typingId,
      sender: "bot",
      text: "…",
      isTyping: true,
      timestamp: new Date().toISOString(),
    };
    appendMessage(typingMsg);
    setLoading(true);

    try {
      const response = await sendChatMessage(query, currentChatId);
      
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      if (response.success) {
        const botMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: response.response,
          timestamp: new Date().toISOString(),
          sources: response.sources || [],
        };
        appendMessage(botMessage);

        // Save to chat history
        console.log("Saving to history with sessionId:", currentChatId);
        
        // Check if this is the first user message to set title
        const userMessages = messages.filter(m => m.sender === 'user');
        const isFirstUserMessage = userMessages.length === 0;
        
        const saveResponse = await saveChatHistory(
          currentChatId, 
          query, 
          response.response,
          // Use first user message as title
          isFirstUserMessage ? 
            query.substring(0, 50) + (query.length > 50 ? '...' : '') : 
            null
        );

        if (!saveResponse.success) {
          console.error("Failed to save history:", saveResponse.message);
        }

      } else {
        appendMessage({
          id: `bot-error-${Date.now()}`,
          sender: "bot",
          text: response.message || "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
          error: true,
        });
      }
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      appendMessage({
        id: `bot-error-${Date.now()}`,
        sender: "bot",
        text: "There was an error contacting the server. Please check your connection and try again.",
        timestamp: new Date().toISOString(),
        error: true,
      });
      console.error("Chat API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateClick = (template) => {
    navigate("/document", { state: { template } });
  };

  const clearChat = () => {
    setMessages([
      {
        id: "bot-welcome",
        sender: "bot",
        text: "Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
        timestamp: new Date().toISOString(),
      },
    ]);
    
    // Update the session in backend to reflect cleared chat
    if (currentChatId && token) {
      // Note: You might want to implement a clear session endpoint in backend
      // For now, we'll just update the frontend state
      console.log("Chat cleared for session:", currentChatId);
    }
  };

  const hasConversationStarted = messages.length > 1;

  return (
    <div className="chat-container">
      {/* Left Side - Chat History */}
      <ChatHistory 
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
      />

      {/* Right Side - Main Chat */}
      <div className="main-chat-area">
        <div className={`chat-window ${hasConversationStarted ? "expanded" : "compact"}`}>
          {/* Chat Header with Clear Button */}

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                sender={m.sender}
                text={m.text}
                timestamp={m.timestamp}
                isTyping={m.isTyping}
                sources={m.sources}
                templates={m.templates}
                onTemplateClick={handleTemplateClick}
                error={m.error}
              />
            ))}
          </div>

          <div className="chat-input-area">
            <ChatInput onSend={handleSend} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}