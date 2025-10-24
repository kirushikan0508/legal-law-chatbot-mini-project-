import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "../ChatInput/ChatInput";
import "./chatWindow.css";
import { useNavigate } from "react-router-dom";

export default function ChatWindow() {

    // Load saved messages or default welcome
const loadSavedMessages = () => {
  const saved = localStorage.getItem("chatMessages");
  if (saved) return JSON.parse(saved);

  return [
    {
      id: "bot-welcome",
      sender: "bot",
      text:"Welcome to Legal Assistant AI — ask your legal question and I'll provide guidance based on Sri Lankan law.",
      timestamp: new Date().toISOString(),
      meta: null,
    },
  ];
};

const [messages, setMessages] = useState(loadSavedMessages);

const hasConversationStarted = messages.length > 1;

// Sync messages to storage when updated
useEffect(() => {
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}, [messages]);
  
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom on messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);


  const appendMessage = (msg) => setMessages((m) => [...m, msg]);

  // Called by ChatInput
  const handleSend = async (query) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toISOString(),
    };
    appendMessage(userMsg);

    // Add bot typing placeholder
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
      const res = await axios.post("/legal-query", { query }); // <-- your backend
      const data = res.data || {};

      // remove typing placeholder
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      // create bot message
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.answer || "Sorry — I couldn't find an answer.",
        timestamp: new Date().toISOString(),
        sources: data.sources || [],
        templates: data.templates || [],
      };

      appendMessage(botMsg);
    } catch (err) {
      // remove typing placeholder
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      appendMessage({
        id: `bot-error-${Date.now()}`,
        sender: "bot",
        text:
          "There was an error contacting the server. Please try again later.",
        timestamp: new Date().toISOString(),
        error: true,
      });
      console.error("Chat API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateClick = (template) => {
    // navigate to document page and pass template id / title as state
    navigate("/document", { state: { template } });
  };

  return (
    <div className={`chat-window ${hasConversationStarted ? "expanded" : "compact"}`}>
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
