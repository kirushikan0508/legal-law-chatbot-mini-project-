import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { 
  FaUsers, 
  FaComments, 
  FaFileAlt, 
  FaCog, 
  FaTachometerAlt, 
  FaSignOutAlt, 
  FaBalanceScale 
} from "react-icons/fa";

function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { label: "Users", path: "/admin/users", icon: <FaUsers /> },
    { label: "Chats", path: "/admin/chats", icon: <FaComments /> },
    { label: "Templates", path: "/admin/templates", icon: <FaFileAlt /> },
    { label: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    // Remove admin login token
    localStorage.removeItem("admin_token");

    // Optional: Remove admin info
    localStorage.removeItem("admin_info");

    // Redirect to admin login
    navigate("/admin-login");
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">
        <FaBalanceScale /> Admin Panel
      </h2>

      <nav className="admin-nav">
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`admin-link ${pathname === item.path ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;
