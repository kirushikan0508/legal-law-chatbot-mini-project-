import { useState, useEffect } from "react";
import "./Documents.css";

export default function Documents() {
  const [title, setTitle] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Load saved docs (temporary frontend storage)
  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("admin_documents")) || [];
    setDocuments(savedDocs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !documentFile || !imageFile) {
      alert("Please fill all fields");
      return;
    }

    // Backend-ready payload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("document", documentFile);
    formData.append("image", imageFile);

    // Frontend mock save (replace with API later)
    const newDoc = {
      id: Date.now(),
      title,
      documentName: documentFile.name,
      imagePreview: URL.createObjectURL(imageFile),
      uploadedAt: new Date().toISOString(),
    };

    const updatedDocs = [newDoc, ...documents];
    setDocuments(updatedDocs);
    localStorage.setItem("admin_documents", JSON.stringify(updatedDocs));

    setTitle("");
    setDocumentFile(null);
    setImageFile(null);
  };

   const handleDelete = (id) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem("admin_documents", JSON.stringify(updatedDocs));
  };

  
  return (
    <div className="documents-page">
      <h2>Upload Legal Document</h2>

      {/* Upload Form */}
      <form className="doc-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setDocumentFile(e.target.files[0])}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button type="submit">Upload Document</button>
      </form>

      {/* Uploaded Documents */}
      <div className="doc-list">
        {documents.map((doc) => (
          <div key={doc.id} className="doc-card">
            <img src={doc.imagePreview} alt={doc.title} />
            <h4>{doc.title}</h4>
            <p>{doc.documentName}</p>
            <small>
              Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
            </small>

            <button
              className="delete-btn"
              onClick={() => handleDelete(doc.id)}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


