import "./AdminCard.css";

export default function AdminCard({ title, value, icon, color = "primary" }) {
  return (
    <div className={`admin-card admin-card-${color}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <h3 className="card-value">{value}</h3>
      </div>
    </div>
  );
}