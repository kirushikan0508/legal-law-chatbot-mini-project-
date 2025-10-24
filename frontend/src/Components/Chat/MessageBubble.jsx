import "./messageBubble.css";

export default function MessageBubble({
  sender,
  text,
  timestamp,
  isTyping,
  sources = [],
  templates = [],
  onTemplateClick,
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

        <div className="meta">
          {templates && templates.length > 0 && (
            <div className="templates">
              <strong>Available Templates:</strong>
              <div className="template-buttons">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    className="template-btn"
                    onClick={() => onTemplateClick(t)}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sources && sources.length > 0 && (
            <div className="sources">
              <details>
                <summary>Sources</summary>
                <ul>
                  {sources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </details>
            </div>
          )}

          <span className="time">{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
