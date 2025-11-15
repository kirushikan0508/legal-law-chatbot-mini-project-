import "./messageBubble.css";

export default function MessageBubble({
  sender,
  text,
  timestamp,
  isTyping,
  error,
}) {
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : "";

  return (
    <div className={`message-row ${sender === "user" ? "user" : "bot"}`}>
      <div className="bubble">
        {isTyping ? (
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className={`bubble-text ${error ? "error" : ""}`}>{text}</div>
        )}
         <span className="time">{timeStr}</span>
       
      </div>
    </div>
  );
}
