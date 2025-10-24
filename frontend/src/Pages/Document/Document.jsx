import { useLocation } from "react-router-dom";

export default function Document() {
  const { state } = useLocation();
  const template = state?.template;

  // map template to form defaults or load template content from backend via template.id
  return (
    <div>
      <h2>Document Generator</h2>
      {template ? <h3>{template.title}</h3> : <p>Select a template to start</p>}
      {/* Render your customize form here (you already have one in Home) */}
    </div>
  );
}
