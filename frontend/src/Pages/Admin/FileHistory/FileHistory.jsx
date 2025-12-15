import { useEffect, useState } from "react";
import "./FileHistory.css";

export default function FileHistory() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 TEMPORARY MOCK DATA (replace with backend API later)
    const mockFiles = [
      {
        _id: "1",
        title: "Penal Code Amendment 2023",
        fileName: "penal_code_2023.pdf",
        fileSize: 3245678,
        createdAt: "2025-01-12T09:20:00Z",
      },
      {
        _id: "2",
        title: "Companies Act Amendment 2024",
        fileName: "companies_act_2024.pdf",
        fileSize: 1892450,
        createdAt: "2025-01-14T14:45:00Z",
      },
    ];

    setTimeout(() => {
      setFiles(mockFiles);
      setLoading(false);
    }, 600);
  }, []);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="file-history-page">
      <h2>File History</h2>
      <p className="file-history-subtext">
        Uploaded legal documents stored in the system
      </p>

      {loading ? (
        <p className="loading-text">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="empty-text">No legal documents uploaded yet.</p>
      ) : (
        <div className="file-table">
          <div className="file-table-header">
            <span>Document Title</span>
            <span>File Name</span>
            <span>Storage</span>
            <span>Uploaded Date</span>
          </div>

          {files.map((file) => (
            <div className="file-table-row" key={file._id}>
              <span className="file-title">{file.title}</span>
              <span>{file.fileName}</span>
              <span>{formatSize(file.fileSize)}</span>
              <span>{formatDate(file.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
