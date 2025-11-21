import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";
import { FaUsers, FaComments, FaFileAlt, FaCog, FaTachometerAlt, FaSignOutAlt, FaBalanceScale } from "react-icons/fa";

 function AdminSidebar() {
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { label: "Users", path: "/admin/users", icon: <FaUsers /> },
    { label: "Chats", path: "/admin/chats", icon: <FaComments /> },
    { label: "Templates", path: "/admin/templates", icon: <FaFileAlt /> },
    { label: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo"> <FaBalanceScale/> Admin Panel</h2>

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

      <div className="admin-logout">
        <FaSignOutAlt />
        Logout
      </div>
    </aside>
  );
}

export default AdminSidebar;