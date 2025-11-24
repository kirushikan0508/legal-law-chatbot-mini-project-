import { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminCard from "../../../Components/Admin/AdminCard/AdminCard";
import { getSummary } from "../api/adminAPI";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    users: "--",
    chats: "--",
    templates: "--",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      setLoading(true);
      try {
        const response = await getSummary();

        if (response.success) {
          setSummary({
            users: response.totalUsers,
            chats: response.totalChats,
            templates: response.totalTemplates,
          });

        } else {
          console.error("Failed to load admin summary:", response.message);
        }
      } catch (error) {
        console.error("Dashboard Summary Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Welcome Admin</h2>
      <p className="dashboard-subtext">Here is your platform overview</p>

      <div className="dashboard-grid">
        <AdminCard 
          title="Total Users" 
          value={loading ? "Loading..." : summary.users} 
        />

        <AdminCard 
          title="Total Chats" 
          value={loading ? "Loading..." : summary.chats} 
        />

        <AdminCard 
          title="Templates" 
          value={loading ? "Loading..." : summary.templates} 
        />
      </div>
    </div>
  );
}

