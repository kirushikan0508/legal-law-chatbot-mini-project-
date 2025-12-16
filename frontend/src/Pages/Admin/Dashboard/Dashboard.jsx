import { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminCard from "../../../Components/Admin/AdminCard/AdminCard";
import { getSummary } from "../api/adminAPI";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    users: "--",
    templates: "--",
    documents: "--",
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
            templates: response.totalTemplates,
            documents: response.totalDocuments,
          });
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
          title="Templates"
          value={loading ? "Loading..." : summary.templates}
        />

        <AdminCard
          title="Legal Documents"
          value={loading ? "Loading..." : summary.documents}
        />
      </div>
    </div>
  );
}
