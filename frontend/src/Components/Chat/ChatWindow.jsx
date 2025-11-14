import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "../ChatInput/ChatInput";
import "./chatWindow.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { sendChatMessage, user, token } = useContext(StoreContext);

  const userKey = user ? `chatMessages_${user.email}` : "chatMessages_guest";

  // Load saved messages or default welcome
  const loadSavedMessages = () => {
    const saved = localStorage.getItem(userKey);
    if (saved) return JSON.parse(saved);

    return [
      {
        id: "bot-welcome",
        sender: "bot",
        text: "Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
        timestamp: new Date().toISOString(),
      },
    ];
  };

  // ✅ Initialize messages
  useEffect(() => {
    setMessages(loadSavedMessages());
  }, [userKey]);

  // ✅ Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(userKey, JSON.stringify(messages));
    }
  }, [messages, userKey]);

  // Auto-scroll to bottom on messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ✅ Append new message
  const appendMessage = (msg) => setMessages((prev) => [...prev, msg]);

  // ✅ Handle user sending a message
  const handleSend = async (query) => {
    if (!query.trim()) return;

    // Check if user is logged in
    if (!token || !user) {
      appendMessage({
        id: `bot-error-${Date.now()}`,
        sender: "bot",
        text: "Please login to chat with the AI assistant.",
        timestamp: new Date().toISOString(),
        error: true,
      });
      return;
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
      // Send message to backend API
      const response = await sendChatMessage(query);
      
      // Remove typing placeholder
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      if (response.success) {
        // Append bot reply
        appendMessage({
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: response.response,
          timestamp: new Date().toISOString(),
          sources: response.sources || [],
        });
      } else {
        // Handle API error
        appendMessage({
          id: `bot-error-${Date.now()}`,
          sender: "bot",
          text: response.message || "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
          error: true,
        });
      }
    } catch (err) {
      // Remove typing placeholder
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      
      // Handle network error
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

  // ✅ Navigate to document page from bot message
  const handleTemplateClick = (template) => {
    navigate("/document", { state: { template } });
  };

  // ✅ Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: "bot-welcome",
        sender: "bot",
        text: "Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
        timestamp: new Date().toISOString(),
      },
    ]);
    localStorage.removeItem(userKey);
  };

  // ✅ Determine whether conversation started
  const hasConversationStarted = messages.length > 1;

  return (
    <div className={`chat-window ${hasConversationStarted ? "expanded" : "compact"}`}>
      {/* Chat Header with Clear Button */}
      <div className="chat-header">
        <h3>Legal AI Assistant</h3>
        {hasConversationStarted && (
          <button className="clear-chat-btn" onClick={clearChat}>
            Clear Chat
          </button>
        )}
      </div>

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
  );
}