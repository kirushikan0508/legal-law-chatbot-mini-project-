import "./Dashboard.css";
import AdminCard from "../../../Components/Admin/AdminCard/AdminCard";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <AdminCard title="Total Users" value="--" />
        <AdminCard title="Total Chats" value="--" />
        <AdminCard title="Templates" value="--" />
      </div>
    </div>
  );
}
