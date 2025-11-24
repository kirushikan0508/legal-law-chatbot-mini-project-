import { useEffect, useState } from "react";
import { getTemplates, createTemplate, deleteTemplate } from "../api/adminAPI";
import "./Templates.css";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch templates from local storage / API
  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  const handleAdd = async () => {
    if (!title || !document) return;

    await createTemplate({
      title,
      content: document,
      date: new Date().toISOString(),
    });

    const updated = await getTemplates();
    setTemplates(Array.isArray(updated) ? updated : []);
    setTitle("");
    setDocument("");
  };

  const handleDelete = async (id) => {
    await deleteTemplate(id);
    const updated = await getTemplates();
    setTemplates(Array.isArray(updated) ? updated : []);
  };

  return (
    <div className="templates-container">
      <h2>Add New Legal Document</h2>

      <div className="template-form">
        <input 
          type="text" 
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Law / Act / Regulation content here..."
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />
        <button onClick={handleAdd}>Save Document</button>
      </div>

      <h3>Saved Documents</h3>
      {loading ? (
        <p>Loading...</p>
      ) : templates.length === 0 ? (
        <p>No documents saved yet.</p>
      ) : (
        <ul className="template-list">
          {templates.map(t => (
            <li key={t.id}>
              <span>{t.title}</span>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
