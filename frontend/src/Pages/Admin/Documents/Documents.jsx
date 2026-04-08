import { useState, useEffect } from "react";
import "./Documents.css";
import { toast } from "react-toastify";
import { 
  FaUpload, 
  FaFilePdf, 
  FaFileWord, 
  FaFileAlt, 
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash
} from "react-icons/fa";

export default function Documents() {
  const [title, setTitle] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch documents from backend
  const fetchDocuments = async (page = 1, status = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      let url = `http://localhost:4000/api/admin/documents?page=${page}&limit=10`;
      if (status) {
        url += `&status=${status}`;
      }
      
      const response = await fetch(url, {
        headers: {
          "token": token
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDocuments(data.documents);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      } else {
        toast.error("Failed to load documents");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Error loading documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(currentPage, filterStatus);
  }, [currentPage, filterStatus]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'text/plain'];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a PDF, DOC, DOCX, or TXT file");
        e.target.value = "";
        return;
      }
      
      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        e.target.value = "";
        return;
      }
      
      setDocumentFile(file);
      
      // Auto-fill title from filename if empty
      if (!title.trim()) {
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitle(fileNameWithoutExt);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a document title");
      return;
    }

    if (!documentFile) {
      toast.error("Please select a document file");
      return;
    }

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("document", documentFile);

      const response = await fetch("http://localhost:4000/api/admin/documents/upload", {
        method: "POST",
        headers: {
          "token": token
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Document uploaded successfully!");
        
        // Reset form
        setTitle("");
        setDocumentFile(null);
        document.querySelector('input[type="file"]').value = "";
        
        // Refresh documents list
        fetchDocuments(1, filterStatus);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`http://localhost:4000/api/admin/documents/${documentId}`, {
        method: "DELETE",
        headers: {
          "token": token
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Document deleted successfully");
        fetchDocuments(currentPage, filterStatus);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete failed. Please try again.");
    }
  };

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FaFilePdf className="file-icon pdf" />;
    if (mimeType.includes('word') || mimeType.includes('doc')) return <FaFileWord className="file-icon word" />;
    return <FaFileAlt className="file-icon text" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaSpinner className="status-icon processing spin" />;
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'failed':
        return <FaTimesCircle className="status-icon failed" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="documents-page">
      <div className="documents-header">
        <h2>Document Management</h2>
        <p>Upload legal documents to Pinecone vector database</p>
      </div>

      {/* Upload Form */}
      <div className="upload-section">
        <h3>Upload New Document</h3>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Document Title *</label>
            <input
              type="text"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Document File *</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="document-upload"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                required
              />
              <label htmlFor="document-upload" className="file-upload-label">
                <FaUpload className="upload-icon" />
                <span>
                  {documentFile ? documentFile.name : "Choose PDF, DOC, DOCX, or TXT file"}
                </span>
                <small>Max 50MB</small>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="upload-btn"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <FaSpinner className="spin" /> Uploading...
              </>
            ) : (
              <>
                <FaUpload /> Upload Document
              </>
            )}
          </button>
        </form>
      </div>

      {/* Filter Controls */}
      <div className="filter-section">
        <h3>Uploaded Documents</h3>
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="status-filter"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="documents-list">
        {loading ? (
          <div className="loading-state">
            <FaSpinner className="spin" /> Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="empty-state">
            <FaFileAlt />
            <p>No documents uploaded yet</p>
          </div>
        ) : (
          <>
            <div className="documents-table">
              <div className="table-header">
                <div className="table-cell">Document</div>
                <div className="table-cell">Uploaded By</div>
                <div className="table-cell">Size</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Date</div>
                <div className="table-cell">Actions</div>
              </div>

              {documents.map((doc) => (
                <div key={doc._id} className="table-row">
                  <div className="table-cell">
                    <div className="document-info">
                      {getFileIcon(doc.mimeType)}
                      <div>
                        <div className="document-title">{doc.title}</div>
                        <div className="document-filename">{doc.originalFilename}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    {doc.uploadedBy?.name || "Unknown"}
                    <div className="user-email">{doc.uploadedBy?.email}</div>
                  </div>
                  
                  <div className="table-cell">
                    {formatFileSize(doc.fileSize)}
                  </div>
                  
                  <div className="table-cell">
                    <div className="status-display">
                      {getStatusIcon(doc.pineconeStatus)}
                      <span className={`status-text ${doc.pineconeStatus}`}>
                        {doc.pineconeStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    {formatDate(doc.uploadedAt)}
                  </div>
                  
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(doc._id)}
                        title="Delete document"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <span>Page {currentPage} of {totalPages}</span>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}