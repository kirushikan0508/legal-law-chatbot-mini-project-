import { useState } from "react";
import "./chatInput.css";
import { FiSend } from "react-icons/fi"; // send icon (install below if needed)

function ChatInput({ onSend }){
    
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim() === "") return;
    onSend(query);
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

    return(
       <div className="chat-input-container">
      <input
        type="text"
        placeholder="Ask your legal question... (e.g., 'My landlord won’t return my deposit')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSend} title="Send message">
        <FiSend className="send-icon" />
      </button>
    </div>
    );

}

export default ChatInput;
