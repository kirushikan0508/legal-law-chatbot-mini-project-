import "./AdminCard.css";

export default function AdminCard({ title, value }) {
  return (
    <div className="admin-card">
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
    </div>
  );
}
