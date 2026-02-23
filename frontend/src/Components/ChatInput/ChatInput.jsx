import { useState } from "react";
import "./chatInput.css";
import { FiSend } from "react-icons/fi"; // send icon (install below if needed)

function ChatInput({ onSend, disabled }){
 
  
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (disabled || query.trim() === "") return;
    onSend(query.trim());
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

    return(

      <div>
       <div className="chat-input-container">
        <input
          type="text"
          placeholder="Ask your legal question... (e.g., 'My landlord won’t return my deposit')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled}
        />
        <button onClick={handleSend} title="Send message" disabled={disabled}>
          <FiSend className="send-icon" />
        </button>
      </div>

      {/* Disclaimer */}
      
        <section className="disclaimer">
          <p>
            <strong>Legal Disclaimer:</strong> This AI provides general legal
            information only. For specific legal advice, consult a qualified Sri
            Lankan attorney.
          </p>
        </section>
   
    </div>
    );

}

export default ChatInput;
