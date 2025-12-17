import { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminCard from "../../../Components/Admin/AdminCard/AdminCard";
import { toast } from "react-toastify";
import { FaUsers, FaFileAlt, FaClipboardList, FaHistory } from "react-icons/fa";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalTemplates: 13, // Fixed template count
    totalDocuments: 0,
    recentUploads: 0,
    documentsByStatus: {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0
    }
  });
  
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("http://localhost:4000/api/admin/stats", {
        headers: {
          "token": token
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSummary({
          totalUsers: data.stats.totalUsers,
          totalTemplates: data.stats.totalTemplates || 13,
          totalDocuments: data.stats.totalDocuments,
          recentUploads: data.stats.recentDocuments?.length || 0,
          documentsByStatus: data.stats.documentsByStatus || {
            pending: 0,
            processing: 0,
            completed: 0,
            failed: 0
          }
        });
        
        setRecentDocuments(data.stats.recentDocuments || []);
        setRecentUsers(data.stats.recentUsers || []);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      processing: "info",
      completed: "success",
      failed: "danger"
    };
    
    return (
      <span className={`status-badge ${statusColors[status] || 'secondary'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>
      <p className="dashboard-subtext">Platform Overview & Analytics</p>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <AdminCard 
          title="Total Users" 
          value={loading ? "..." : summary.totalUsers}
          icon={<FaUsers />}
          color="primary"
        />

        <AdminCard 
          title="Available Templates" 
          value={summary.totalTemplates}
          icon={<FaClipboardList />}
          color="success"
        />

        <AdminCard
          title="Uploaded Documents"
          value={loading ? "..." : summary.totalDocuments}
          icon={<FaFileAlt />}
          color="info"
        />

        <AdminCard
          title="Recent Uploads (7 days)"
          value={loading ? "..." : summary.recentUploads}
          icon={<FaHistory />}
          color="warning"
        />
      </div>

      {/* Document Status Overview */}
      <div className="status-overview">
        <h3>Document Processing Status</h3>
        <div className="status-cards">
          <div className="status-card pending">
            <span className="status-count">{summary.documentsByStatus.pending}</span>
            <span className="status-label">Pending</span>
          </div>
          <div className="status-card processing">
            <span className="status-count">{summary.documentsByStatus.processing}</span>
            <span className="status-label">Processing</span>
          </div>
          <div className="status-card completed">
            <span className="status-count">{summary.documentsByStatus.completed}</span>
            <span className="status-label">Completed</span>
          </div>
          <div className="status-card failed">
            <span className="status-count">{summary.documentsByStatus.failed}</span>
            <span className="status-label">Failed</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="recent-section">
          <h3>Recent Documents</h3>
          {recentDocuments.length === 0 ? (
            <p className="no-data">No recent documents</p>
          ) : (
            <div className="recent-list">
              {recentDocuments.map((doc, index) => (
                <div key={index} className="recent-item">
                  <div className="item-icon">
                    <FaFileAlt />
                  </div>
                  <div className="item-details">
                    <div className="item-title">{doc.title}</div>
                    <div className="item-meta">
                      <span>{formatFileSize(doc.fileSize)}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      {getStatusBadge(doc.pineconeStatus)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="recent-section">
          <h3>Recent Users</h3>
          {recentUsers.length === 0 ? (
            <p className="no-data">No recent users</p>
          ) : (
            <div className="recent-list">
              {recentUsers.map((user, index) => (
                <div key={index} className="recent-item">
                  <div className="item-icon">
                    <FaUsers />
                  </div>
                  <div className="item-details">
                    <div className="item-title">{user.name || user.email}</div>
                    <div className="item-meta">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}