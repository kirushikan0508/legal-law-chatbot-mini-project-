import { useEffect, useState } from "react";
import "./FileHistory.css";
import { toast } from "react-toastify";
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileAlt, 
  FaSpinner,
  FaSearch,
  FaDownload,
  FaEye
} from "react-icons/fa";

export default function FileHistory() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFiles = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      let url = `http://localhost:4000/api/admin/documents?page=${page}&limit=10`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          "token": token
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFiles(data.documents);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      } else {
        toast.error("Failed to load file history");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error loading file history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFiles(1, searchTerm);
  };

  const handleView = (documentId) => {
    // View document details
    window.open(`/api/admin/documents/${documentId}`, '_blank');
  };

  const handleDownload = async (documentId, filename) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`http://localhost:4000/uploads/documents/${documentId}`, {
        headers: {
          "token": token
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("File not found");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed");
    }
  };

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FaFilePdf className="file-icon pdf" />;
    if (mimeType.includes('word') || mimeType.includes('doc')) return <FaFileWord className="file-icon word" />;
    return <FaFileAlt className="file-icon text" />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pending", class: "pending" },
      processing: { label: "Processing", class: "processing" },
      completed: { label: "Ready", class: "completed" },
      failed: { label: "Failed", class: "failed" }
    };
    
    const config = statusConfig[status] || { label: status, class: "unknown" };
    
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="file-history-page">
      <div className="file-history-header">
        <h2>File History</h2>
        <p>Legal documents uploaded to the system</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search documents by title or filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Files Table */}
      <div className="files-container">
        {loading ? (
          <div className="loading-state">
            <FaSpinner className="spin" /> Loading files...
          </div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <FaFileAlt className="empty-icon" />
            <p>No documents found</p>
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  fetchFiles(1, "");
                }}
                className="clear-search-btn"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="files-table">
              <div className="table-header">
                <div className="header-cell">Document</div>
                <div className="header-cell">Uploaded By</div>
                <div className="header-cell">Size</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Upload Date</div>
                <div className="header-cell">Actions</div>
              </div>

              {files.map((file) => (
                <div key={file._id} className="table-row">
                  <div className="table-cell">
                    <div className="file-info">
                      {getFileIcon(file.mimeType)}
                      <div className="file-details">
                        <div className="file-title">{file.title}</div>
                        <div className="file-name">{file.originalFilename}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    <div className="uploader-info">
                      <div className="uploader-name">{file.uploadedBy?.name || "Unknown"}</div>
                      <div className="uploader-email">{file.uploadedBy?.email}</div>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    {formatSize(file.fileSize)}
                  </div>
                  
                  <div className="table-cell">
                    {getStatusBadge(file.pineconeStatus)}
                  </div>
                  
                  <div className="table-cell">
                    {formatDate(file.uploadedAt)}
                  </div>
                  
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleView(file._id)}
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      
                      {file.pineconeStatus === 'completed' && (
                        <button 
                          className="action-btn download-btn"
                          onClick={() => handleDownload(file.vectorId, file.originalFilename)}
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                      )}
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
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                <div className="page-info">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Statistics Summary */}
      {!loading && files.length > 0 && (
        <div className="stats-summary">
          <div className="stat-card">
            <h4>Total Files</h4>
            <p>{files.length}</p>
          </div>
          <div className="stat-card">
            <h4>Total Size</h4>
            <p>{formatSize(files.reduce((acc, file) => acc + file.fileSize, 0))}</p>
          </div>
          <div className="stat-card">
            <h4>Ready for Search</h4>
            <p>{files.filter(f => f.pineconeStatus === 'completed').length}</p>
          </div>
        </div>
      )}
    </div>
  );
}